import { Meta } from '@aquiver-cfx/shared';

class LocalMeta extends Meta {
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
		emit('localMetaChange', key, value, oldValue);
	}
}

export const localMeta = new LocalMeta();
