import { Vector3 } from '@aquiver-cfx/shared';
import { NetEntity } from '../NetEntity';

export class NetProp extends NetEntity {
	static getByScriptId(id: number) {
		return new NetProp(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return new NetProp(entity);
	}

	protected _stateBag: StateBagInterface;

	constructor(private _scriptID: number) {
		super();

		this._stateBag = Entity(this.scriptID).state;
	}

	get scriptID(): number {
		return this._scriptID;
	}

	attachToEntity(
		entity: NetEntity,
		boneIndex: number,
		offset: Vector3 = new Vector3(),
		rotation: Vector3 = new Vector3(),
		collision: boolean = false,
		fixedRot: boolean = true
	) {
		AttachEntityToEntity(
			this.scriptID,
			entity.scriptID,
			boneIndex,
			offset.x,
			offset.y,
			offset.z,
			rotation.x,
			rotation.y,
			rotation.z,
			false,
			false,
			collision,
			false,
			2,
			fixedRot
		);
	}

	attachToEntityPhysically(
		entity: NetEntity,
		boneIndex: number,
		offset: Vector3 = new Vector3(),
		rotation: Vector3 = new Vector3(),
		collision: boolean = false,
		fixedRot: boolean = true
	) {
		AttachEntityToEntityPhysically(
			this.scriptID,
			entity.scriptID,
			-1,
			boneIndex,
			0.0,
			0.0,
			0.0,
			offset.x,
			offset.y,
			offset.z,
			rotation.x,
			rotation.y,
			rotation.z,
			0.0,
			fixedRot,
			true,
			collision,
			false,
			2
		);
	}

	playAnim(dictionary: string, animation: string, loop: boolean, stayInAnim: boolean) {
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

	stopAnim(dictionary: string, animation: string) {
		StopEntityAnim(this.scriptID, animation, dictionary, 3);
	}

	placeOnGround() {
		PlaceObjectOnGroundProperly(this.scriptID);
	}
}
