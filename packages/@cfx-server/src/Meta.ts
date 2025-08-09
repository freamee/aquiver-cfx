import _ from 'lodash';

export abstract class BaseMeta {
	protected metaMap = new Map<string, any>();

	protected abstract onSet(key: string, value: any, oldValue: any): void;
	protected abstract onDelete(key: string, oldValue: any): void;
	protected abstract onChange(key: string, value: any, oldValue: any): void;

	set<T = unknown>(key: string, value: T) {
		const oldValue = this.metaMap.get(key);

		this.metaMap.set(key, value);

		this.onSet(key, value, oldValue);

		if (!_.isEqual(value, oldValue)) {
			this.onChange(key, value, oldValue);
		}
	}

	get<T = unknown>(key: string): T {
		return this.metaMap.get(key);
	}

	has(key: string) {
		return this.metaMap.has(key);
	}

	delete(key: string) {
		const oldValue = this.metaMap.get(key);

		const response = this.metaMap.delete(key);

		this.onDelete(key, oldValue);

		if (response) {
			this.onChange(key, undefined, oldValue);
		}

		return response;
	}

	/** Returns the meta as an object. */
	fromEntries() {
		return Object.fromEntries(this.metaMap);
	}
}
