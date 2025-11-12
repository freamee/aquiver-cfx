type tCallbackFunction = (...args: any[]) => void;

const callbacks = new Map<string, tCallbackFunction>();
const maxTimeout = 30000;
const resourceName = GetCurrentResourceName();

/** Flood protection */
const timestamps = new Map<string, number>();
const floodProtection = true;
const floodMs = 250;

onNet(`aquiver_rpc_${resourceName}`, (key: string, ...args: any[]) => {
	const callback = callbacks.get(key);
	if (!callback) return;

	callbacks.delete(key);

	callback(...args);
});

export function onRpc(eventName: string, callback: (playerSource: number, ...args: any[]) => void) {
	onNet(`aquiver_rpc_${eventName}`, async (key: string, ...args: any[]) => {
		const incomingSource = source;
		const floodKey = `${incomingSource}:${eventName}`;

		if (floodProtection) {
			const now = Date.now();
			const lastCall = timestamps.get(floodKey) ?? 0;
			if (now - lastCall < floodMs) return;

			timestamps.set(floodKey, now);
		}

		try {
			const response = await callback(incomingSource, ...args);

			emitNet(`aquiver_cb_${resourceName}`, incomingSource, key, response);
		} catch (error) {
			console.error(`Rpc error ${eventName}`, error);

			emitNet(`aquiver_cb_${resourceName}`, incomingSource, key, null);
		}
	});
}

export function emitRpc<T = unknown>(eventName: string, playerSource: number, ...args: any[]) {
	let key: string;

	do {
		key = `${eventName}:${Math.floor(Math.random() * (100000 + 1))}:${playerSource}`;
	} while (callbacks.has[key]);

	emitNet(`aquiver_rpc_${eventName}`, playerSource, key, ...args);

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
