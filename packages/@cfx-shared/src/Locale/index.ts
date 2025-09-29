import { printf } from 'fast-printf';

const resourceName: string = GetCurrentResourceName();

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

function flatten(obj: Record<string, any>, prefix = ''): Record<string, string> {
	let res: Record<string, string> = {};

	for (const [k, v] of Object.entries(obj)) {
		const newKey = prefix ? `${prefix}.${k}` : k;

		if (typeof v === 'object' && v !== null) {
			Object.assign(res, flatten(v, newKey));
		} else {
			res[newKey] = String(v);
		}
	}

	return res;
}

function load(languageKey: string) {
	const jsonStr = LoadResourceFile(resourceName, `data/locales/${languageKey}.json`);

	if (!jsonStr) {
		console.warn(`Language key not found: ${languageKey}`);
	}

	return JSON.parse(jsonStr) || {};
}

export function initLocale(languageKey: string) {
	const locales = load(languageKey);

	const flattened = flatten(locales);

	for (const [k, v] of Object.entries(flattened)) {
		keys.set(k, v);
	}
}
