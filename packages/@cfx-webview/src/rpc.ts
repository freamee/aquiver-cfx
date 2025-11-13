import { useEvent } from './EventBridge';

const { on, emit } = useEvent();

type tCallbackFunction = (...args: any[]) => void;

const callbacks = new Map<string, tCallbackFunction>();
const maxTimeout = 30000;
let resourceName: string = 'UNKNOWN_PLATFORM';

// @ts-ignore
if (typeof GetCurrentResourceName === 'function') {
	// @ts-ignore
	resourceName = GetCurrentResourceName();
}

window.addEventListener('message', (event) => {
	const { data } = event;

	const cb = callbacks.get(data.eventName);

	if (typeof cb === 'function') {
		cb(...data.arguments);
	}
});

on(`aquiver_rpc_${resourceName}`, (key: string, ...args: any[]) => {
	const callback = callbacks.get(key);
	if (!callback) return;

	callbacks.delete(key);

	callback(...args);
});

export function onRpc(eventName: string, callback: Function) {
	on(`aquiver_rpc_${eventName}`, async (key: string, ...args: any[]) => {
		try {
			const response = await callback(...args);

			emit(`aquiver_rpc_${resourceName}`, key, response);
		} catch (error) {
			console.error(`Rpc error ${eventName}`, error);

			emit(`aquiver_rpc_${resourceName}`, key, null);
		}
	});
}

export function emitRpc<T = unknown>(eventName: string, ...args: any[]): Promise<T> {
	let key: string;

	do {
		key = `${eventName}:${Math.floor(Math.random() * (100000 + 1))}`;
	} while (callbacks.has(key));

	emit(`aquiver_rpc_${eventName}`, key, ...args);

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

export async function emitNetRpc<T = unknown>(eventName: string, ...args: any[]): Promise<T> {
	// const response = await emitRpc(eventName, ...args);
	// return response;

	return Promise.resolve() as T;
}

export function useRpc() {
	return { onRpc, emitRpc, emitNetRpc };
}
