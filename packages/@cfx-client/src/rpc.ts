const callbacks = new Map<string, (...args: any[]) => void>();
const maxTimeout = 30000;
const resourceName = GetCurrentResourceName();

onNet(`aquiver_rpc_${resourceName}`, (key: string, ...args: any) => {
	const resolve = callbacks.get(key);
	if (!resolve) return;

	callbacks.delete(key);

	resolve(...args);
});

export function onRpc(eventName: string, callback: (...args: any[]) => any) {
	onNet(`aquiver_rpc_${eventName}`, async (key: string, ...args: any[]) => {
		try {
			const response = await callback(...args);

			emitNet(`aquiver_rpc_${resourceName}`, key, response);
		} catch (error) {
			console.error(`Rpc error ${eventName}`, error);

			emitNet(`aquiver_rpc_${resourceName}`, key, null);
		}
	});
}

export function emitRpc<T = unknown>(eventName: string, ...args: any[]): Promise<T> | void {
	let key: string;

	do {
		key = `${eventName}:${Math.floor(Math.random() * (100000 + 1))}`;
	} while (callbacks.has(key));

	emitNet(`aquiver_rpc_${eventName}`, key, ...args);

	return new Promise<T>((resolve, reject) => {
		callbacks.set(key, (result) => resolve(result));

		setTimeout(() => {
			if (callbacks.has(key)) {
				callbacks.delete(key);
				reject(new Error(`callback event '${key}' timed out`));
			}
		}, maxTimeout);
	});
}
