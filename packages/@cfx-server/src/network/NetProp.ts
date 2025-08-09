import { Vector3 } from 'three';
import { NetEntity } from './NetEntity';

export class NetProp extends NetEntity {
	static create(
		modelHash: string | number,
		position: Vector3,
		dimension: number = 0,
		rotation: Vector3 = new Vector3()
	) {
		const id = CreateObjectNoOffset(
			modelHash,
			position.x,
			position.y,
			position.z,
			true,
			true,
			false
		);

		SetEntityRoutingBucket(id, dimension);

		SetEntityOrphanMode(id, 2);

		SetEntityRotation(id, rotation.x, rotation.y, rotation.z, 2, false);

		return new NetProp(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return this.getByScriptId(entity);
	}

	static getByScriptId(id: number) {
		return new NetProp(id);
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
