import { Meta } from '@aquiver-cfx/shared';

class _Meta extends Meta {
	constructor(private baseObject: BaseObject) {
		super();
	}

	protected onSet(key: string, value: any, oldValue: any): void {
		//
	}

	protected onDelete(key: string, oldValue: any): void {
		//
	}

	protected onChange(key: string, value: any, oldValue: any): void {
		emit('metaChange', this.baseObject, key, value, oldValue);
	}
}

export abstract class BaseObject {
	private _meta: _Meta;

	protected constructor() {
		this._meta = new _Meta(this);
	}

	get meta() {
		return this._meta;
	}

	cast<T extends BaseObject>(type: new (...args: any[]) => T): this is T {
		return this instanceof type;
	}
}
