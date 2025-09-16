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
		emit('metaChange', this.baseObject.id, key, value, oldValue);
	}
}

export abstract class BaseObject {
	private static idCounter = 0;

	private _id: number;
	private _meta: _Meta;

	constructor() {
		this._id = BaseObject.idCounter++;
		this._meta = new _Meta(this);
	}

	get id() {
		return this._id;
	}

	get meta() {
		return this._meta;
	}

	cast<T extends BaseObject>(type: new (...args: any[]) => T): this is T {
		return this instanceof type;
	}
}
