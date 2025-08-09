import { Vector3 } from 'three';
import { NetEntity } from './NetEntity';

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

	constructor(private _scriptID: number) {
		super();

		this._stateBag = Entity(this._scriptID).state;
	}

	get scriptID(): number {
		return this._scriptID;
	}
}
