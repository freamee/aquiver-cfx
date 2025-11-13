export async function onView(eventName: string, callback: (...args: any[]) => void) {
	RegisterNuiCallback(eventName, async (data: any, cb: Function) => {
		try {
			const response = await callback(...data.args);

			cb({
				success: true,
				data: response
			});
		} catch (error) {
			console.error(error);

			cb({
				success: false,
				data: []
			});
		}
	});
}

export function emitView(eventName: string, ...args: any[]) {
	SendNUIMessage({
		eventName,
		args
	});
}
