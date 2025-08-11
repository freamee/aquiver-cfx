type Listener = (...args: any[]) => void;

const eventsMap = new Map<string, Listener[]>();

class EventManager {
	on(eventName: string, listener: Listener) {
		if (!eventsMap.has(eventName)) {
			eventsMap.set(eventName, []);
		}

		eventsMap.get(eventName)?.push(listener);
	}

	off(eventName: string, listener: Listener) {
		if (eventsMap.has(eventName)) {
			eventsMap.set(
				eventName,
				eventsMap.get(eventName)!.filter((i) => i !== listener)
			);
		}
	}

	emit(eventName: string, ...args: any[]) {
		if (eventsMap.has(eventName)) {
			for (const listener of eventsMap.get(eventName)!) {
				listener(...args);
			}
		}
	}
}

export const events = new EventManager();
