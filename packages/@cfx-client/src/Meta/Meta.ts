import { Meta } from '@aquiver-cfx/shared';

class _Meta extends Meta {
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
		emit('metaChange', key, value, oldValue);
	}
}

export const meta = new _Meta();
