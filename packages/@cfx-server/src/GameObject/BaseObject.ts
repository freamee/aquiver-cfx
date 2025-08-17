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
		emitNet('baseObject:setSyncedMeta', -1, this.baseObject.id, key, value);
	}

	protected onDelete(key: string, oldValue: any): void {
		emitNet('baseObject:deleteSyncedMeta', -1, this.baseObject.id, key);
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
		return [...this.entities.values()];
	}

	static get count() {
		return this.entities.size;
	}

	abstract get type(): string;

	private static idCounter = 0;

	private _id: number;
	private _replicated: boolean;
	private _meta: _Meta;
	private _syncedMeta: _SyncedMeta;

	constructor(replicated: boolean = false) {
		this._id = BaseObject.idCounter++;
		this._replicated = replicated;
		this._meta = new _Meta(this);
		this._syncedMeta = new _SyncedMeta(this);

		BaseObject.entities.set(this.id, this);
	}

	get id() {
		return this._id;
	}

	get replicated() {
		return this._replicated;
	}

	get meta() {
		return this._meta;
	}

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
