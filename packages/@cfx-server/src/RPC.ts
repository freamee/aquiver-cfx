type tRpcRequest = (...args: any[]) => void;

export class RPC {
	private events = new Map<string, (source: number | string, ...args: any[]) => any>();
	private pendingRequests = new Map<string, tRpcRequest>();

	constructor() {
		onNet('rpc:serverResponse', this.handleResponse.bind(this));
		onNet('rpc:serverRequest', this.handleRequest.bind(this));
	}

	onRpc(rpcName: string, callback: (source: number | string, ...args: any[]) => void) {
		if (this.events.has(rpcName)) {
			throw new Error(`onRpc already registered: ${rpcName}`);
		}

		this.events.set(rpcName, callback);
	}

	emitRpc<T = unknown>(source: number, rpcName: string, ...args: any[]) {
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
					reject(new Error('RPC call failed'));
				}
			});

			emitNet('rpc:clientRequest', source, requestId, rpcName, ...args);
		});
	}

	private async handleRequest(
		source: number | string,
		id: string,
		rpcName: string,
		...args: any[]
	) {
		const callback = this.events.get(rpcName);

		if (typeof callback !== 'function') {
			emitNet('rpc:clientResponse', source, id, false);
			return;
		}

		try {
			const response = await callback(source, ...args);

			emitNet('rpc:clientResponse', source, id, true, response);
		} catch (error) {
			console.error(error);

			emitNet('rpc:clientResponse', source, id, false);
		}
	}

	private async handleResponse(source: number | string, id: string, success: boolean, data: any) {
		const resolve = this.pendingRequests.get(id);

		if (resolve) {
			resolve({
				success,
				data
			});

			this.pendingRequests.delete(id);
		}
	}
}
