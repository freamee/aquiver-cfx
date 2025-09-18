type tRpcRequest = (...args: any[]) => void;

export class RPC {
	private events = new Map<string, (...args: any[]) => void>();
	private pendingRequests = new Map<string, tRpcRequest>();

	constructor() {
		onNet('rpc:clientResponse', this.handleResponse.bind(this));
		onNet('rpc:clientRequest', this.handleRequest.bind(this));
	}

	onRpc(rpcName: string, callback: tRpcRequest) {
		if (this.events.has(rpcName)) {
			throw new Error(`onRpc already registered: ${rpcName}`);
		}

		this.events.set(rpcName, callback);
	}

	emitRpc<T = unknown>(rpcName: string, ...args: any[]): Promise<T> {
		return new Promise((resolve, reject) => {
			const requestId = `${rpcName}_${Date.now()}_${Math.random()}`;

			const timeout = setTimeout(() => {
				this.pendingRequests.delete(requestId);
				reject(new Error('RPC call timed out: ' + rpcName));
			}, 5000);

			this.pendingRequests.set(requestId, (response: { success: boolean; data: T }) => {
				clearTimeout(timeout);

				if (response.success) {
					resolve(response.data);
				} else {
					reject(new Error(`RPC call failed: ${rpcName}`));
				}
			});

			emitNet('rpc:serverRequest', requestId, rpcName, ...args);
		});
	}

	private async handleResponse(id: string, success: boolean, data: any) {
		const resolve = this.pendingRequests.get(id);

		if (resolve) {
			resolve({
				success,
				data
			});

			this.pendingRequests.delete(id);
		}
	}

	private async handleRequest(requestId: string, rpcName: string, ...args: any[]) {
		const callback = this.events.get(rpcName);

		if (typeof callback !== 'function') {
			emitNet('rpc:serverResponse', requestId, false);
			return;
		}

		try {
			const response = await callback(...args);

			emitNet('rpc:serverResponse', requestId, true, response);
		} catch (error) {
			console.error(error);

			emitNet('rpc:serverResponse', requestId, false);
		}
	}
}
