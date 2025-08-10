import { Meta } from '@aquiver-cfx/shared';

class SyncedMeta extends Meta {
	constructor() {
		super();
	}

	protected onSet(key: string, value: any, oldValue: any): void {
		//
	}

	protected onDelete(key: string, oldValue: any): void {
		//
	}

	protected onChange(key: string, value: any, oldValue: any): void {
		emit('globalSyncedMetaChange', key, value, oldValue);
	}
}

export const syncedMeta = new SyncedMeta();
