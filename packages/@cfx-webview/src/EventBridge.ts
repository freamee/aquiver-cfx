type tFunction = (...args: any[]) => void;

const resourceName =
	// @ts-ignore
	typeof GetParentResourceName === 'function' ? GetParentResourceName() : 'unknown_resource';

const eventsMap = new Map<string, Set<tFunction>>();

window.addEventListener('message', (event) => {
	const { data } = event;

	const callbacks = eventsMap.get(data.eventName);

	if (callbacks.size > 0) {
		for (const cb of callbacks) {
			cb(data.args);
		}
	}
});

function on(eventName: string, cb: tFunction) {
	if (!eventsMap.has(eventName)) {
		eventsMap.set(eventName, new Set());
	}

	eventsMap.get(eventName).add(cb);
}

function off(eventName: string, cb: tFunction) {
	const events = eventsMap.get(eventName);
	if (events.size <= 0) return;

	events.delete(cb);

	if (events.size === 0) {
		eventsMap.delete(eventName);
	}
}

async function emit<T = unknown>(eventName: string, ...args: any[]): Promise<T> {
	try {
		const response = await fetch(`https://${resourceName}/${eventName}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({
				args
			})
		});

		const result = await response.json();

		if (!result.success) return Promise.reject(`Rpc emit failed: ${eventName}`);

		return Promise.resolve(result.data);
	} catch (error) {
		return Promise.reject();
	}
}

export function useEvent() {
	return { on, off, emit };
}
