import { NetEntity } from '../NetEntity';

export class NetProp extends NetEntity {
	static getByScriptId(id: number) {
		return new NetProp(id);
	}

	static getByNetId(id: number) {
		if (NetworkDoesEntityExistWithNetworkId(id)) {
			const entity = NetworkGetEntityFromNetworkId(id);

			return this.getByScriptId(entity);
		}
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

	playEntityAnim(dictionary: string, animation: string, loop: boolean, stayInAnim: boolean) {
		PlayEntityAnim(
			this.scriptID,
			animation,
			dictionary,
			1000.0,
			loop,
			stayInAnim,
			false,
			0.0,
			0
		);
	}

	stopEntityAnim(dictionary: string, animation: string) {
		StopEntityAnim(this.scriptID, animation, dictionary, 3);
	}

	placeOnGround() {
		PlaceObjectOnGroundProperly(this.scriptID);
	}
}
