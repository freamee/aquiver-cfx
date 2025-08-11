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

class _SyncedMeta extends Meta {
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
		emit('syncedMetaChange', this.baseObject.id, key, value, oldValue);
	}
}

export abstract class BaseObject {
	protected static entities = new Map<number, BaseObject>();

	static getByID(id: number) {
		return this.entities.get(id);
	}

	static get all() {
		return Array.from(this.entities.values());
	}

	static get count() {
		return this.entities.size;
	}

	private static idCounter = 0;

	private _id: number;
	private _meta: _Meta;
	private _syncedMeta: _SyncedMeta;

	protected constructor() {
		this._id = BaseObject.idCounter++;
		this._meta = new _Meta(this);
		this._syncedMeta = new _SyncedMeta(this);

		BaseObject.entities.set(this.id, this);
	}

	/** Client Id */
	get id() {
		return this._id;
	}

	/** Client side meta (does not affected by server set meta.) */
	get meta() {
		return this._meta;
	}

	/** Can be modified, from server side (syncedMeta) */
	get syncedMeta() {
		return this._syncedMeta;
	}

	cast<T extends BaseObject>(type: new (...args: any[]) => T): this is T {
		return this instanceof type;
	}

	destroy() {
		BaseObject.entities.delete(this.id);
	}
}
