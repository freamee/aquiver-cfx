import { Vector3 } from '@aquiver-cfx/shared';
import { NetEntity } from '../NetEntity';

export class NetPed extends NetEntity {
	static create(
		modelHash: string | number,
		position: Vector3,
		dimension: number = 0,
		heading: number = 0
	) {
		const id = CreatePed(4, modelHash, position.x, position.y, position.z, heading, true, true);

		SetEntityRoutingBucket(id, dimension);

		SetEntityOrphanMode(id, 2);

		return new NetPed(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return this.getByScriptId(entity);
	}

	static getByScriptId(id: number) {
		return new NetPed(id);
	}

	protected _stateBag: StateBagInterface;

	private readonly _scriptID: number;

	constructor(scriptID: number) {
		super();

		this._scriptID = scriptID;

		this._stateBag = Entity(scriptID).state;
	}

	get scriptID(): number {
		return this._scriptID;
	}
}
