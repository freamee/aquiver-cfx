const resourceName = GetCurrentResourceName();

/** Flood protection */
const timestamps = new Map<string, number>();
const floodMs = 500;

export function onRpc(
	eventName: string,
	callback: (playerSource: number, ...args: any[]) => void,
	floodProtectionTime: number = floodMs
) {
	onNet(`aquiver_rpc_${eventName}`, async (key: string, ...args: any[]) => {
		const incomingSource = source;
		const floodKey = `${incomingSource}:${eventName}`;

		if (floodProtectionTime > 0) {
			const now = Date.now();
			const lastCall = timestamps.get(floodKey) ?? 0;
			if (now - lastCall < floodMs) return;

			timestamps.set(floodKey, now);
		}

		try {
			const response = await callback(incomingSource, ...args);

			emitNet(`aquiver_rpc_${resourceName}`, incomingSource, key, response);
		} catch (error) {
			console.error(`Rpc error ${eventName}`, error);

			emitNet(`aquiver_rpc_${resourceName}`, incomingSource, key, null);
		}
	});
}
