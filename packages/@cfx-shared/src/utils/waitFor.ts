export async function waitFor(
	condition: () => boolean,
	timeout: number = 10000,
	interval: number = 100,
	message: string = ''
) {
	const startTime = Date.now();

	return new Promise<void>((resolve, reject) => {
		const check = setInterval(() => {
			try {
				if (condition()) {
					clearInterval(check);
					resolve();
				}

				if (Date.now() - startTime >= timeout) {
					clearInterval(check);

					throw new Error('waitFor failed: Condition not met within timeout', {
						cause: message
					});
				}
			} catch (error) {
				clearInterval(check);
				reject(error);
			}
		}, interval);
	});
}
