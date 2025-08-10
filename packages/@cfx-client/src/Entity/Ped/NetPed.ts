import { NetEntity } from '../NetEntity';

export class NetPed extends NetEntity {
	static getByScriptId(id: number) {
		return new NetPed(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return new NetPed(entity);
	}

	protected _stateBag: StateBagInterface;

	constructor(private _scriptID: number) {
		super();

		this._stateBag = Entity(this.scriptID).state;
	}

	get scriptID(): number {
		return this._scriptID;
	}
}
