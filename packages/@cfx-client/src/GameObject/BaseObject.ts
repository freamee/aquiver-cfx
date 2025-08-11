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
	protected static _entities = new Map<number, BaseObject>();
	protected static _remote = new Map<number, BaseObject>();

	static getById(id: number) {
		return this._entities.get(id);
	}

	static getByRemoteId(id: number) {
		return this._remote.get(id);
	}

	static get all() {
		return [...this._entities.values()];
	}

	static get count() {
		return this._entities.size + this._remote.size;
	}

	private static idCounter = 0;

	private _id: number;
	private _meta: _Meta;
	private _syncedMeta: _SyncedMeta;
	private _remoteId: number = -1;

	protected constructor(remoteId: number = -1) {
		this._id = BaseObject.idCounter++;
		this._remoteId = remoteId;
		this._meta = new _Meta(this);
		this._syncedMeta = new _SyncedMeta(this);

		BaseObject._entities.set(this._id, this);

		if (this.isRemote) {
			BaseObject._remote.set(this._remoteId, this);
		}
	}

	/** Client Id */
	get id() {
		return this._id;
	}

	get isRemote() {
		return this._remoteId !== -1;
	}

	get remoteId() {
		return this._remoteId;
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
		BaseObject._entities.delete(this.id);

		if (this.isRemote) {
			BaseObject._remote.delete(this._remoteId);
		}
	}
}
