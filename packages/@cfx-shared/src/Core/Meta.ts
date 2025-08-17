export abstract class Meta {
	private _metaMap = new Map<string, any>();

	protected abstract onSet(key: string, value: any, oldValue: any): void;
	protected abstract onDelete(key: string, oldValue: any): void;
	protected abstract onChange(key: string, value: any, oldValue: any): void;

	set<T = unknown>(key: string, value: T) {
		const oldValue = this._metaMap.get(key);

		this._metaMap.set(key, value);

		this.onSet(key, value, oldValue);

		// if (!_.isEqual(value, oldValue)) {
		// 	this.onChange(key, value, oldValue);
		// }
	}

	get<T = unknown>(key: string): T {
		return this._metaMap.get(key);
	}

	has(key: string) {
		return this._metaMap.has(key);
	}

	delete(key: string) {
		const oldValue = this._metaMap.get(key);

		const response = this._metaMap.delete(key);

		this.onDelete(key, oldValue);

		if (response) {
			this.onChange(key, undefined, oldValue);
		}

		return response;
	}

	/** Returns the meta as an object. */
	fromEntries() {
		return Object.fromEntries(this._metaMap);
	}
}
