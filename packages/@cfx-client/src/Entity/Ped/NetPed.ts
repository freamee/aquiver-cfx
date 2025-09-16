import { NetEntity } from '../NetEntity';

export class NetPed extends NetEntity {
	static getByScriptId(id: number) {
		return new NetPed(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return this.getByScriptId(entity);
	}

	protected _stateBag: StateBagInterface;

	private readonly _scriptID: number;

	constructor(scriptID: number) {
		super();

		this._scriptID = scriptID;

		this._stateBag = Entity(scriptID).state;
	}

	get scriptID() {
		return this._scriptID;
	}
}
