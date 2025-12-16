import { printf } from 'fast-printf';
import { useEvent } from './EventBridge';

const { on } = useEvent();

const keys = new Map<string, string>();

export function locale(key: string, ...args: any[]) {
	const value = keys.get(key);

	if (!value) {
		return key;
	}

	if (typeof value !== 'string') {
		return key;
	}

	if (args.length > 0) {
		return printf(value, ...args);
	}

	return value;
}

on('Locale:Set', (data: Record<string, string>) => {
	keys.clear();

	for (const [key, value] of Object.entries(data)) {
		keys.set(key, value);
	}
});
