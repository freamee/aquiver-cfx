import { Quaternion, Vector3 } from 'three';

export abstract class NetEntity {
	abstract get scriptID(): number;

	protected abstract _stateBag: StateBagInterface;

	setStateBag<T = unknown>(key: string, value: T, replicated: boolean) {
		this._stateBag.set(key, value, replicated);
	}

	getStateBag<T = unknown>(key: string): T | null {
		return this._stateBag[key];
	}

	hasNetOwner() {
		return this.netOwner !== -1;
	}

	isNetOwner(source: number) {
		return this.netOwner === source;
	}

	get attachedTo() {
		return GetEntityAttachedTo(this.scriptID);
	}

	get isValid() {
		return this.scriptID !== -1 && DoesEntityExist(this.scriptID);
	}

	get modelHash() {
		return GetEntityModel(this.scriptID);
	}

	get netOwner() {
		return NetworkGetEntityOwner(this.scriptID);
	}

	get networkID() {
		return NetworkGetNetworkIdFromEntity(this.scriptID);
	}

	get heading() {
		return this.rotation.z;
	}

	set heading(heading: number) {
		this.rotation = this.rotation.clone().setZ(heading);
	}

	get freezePosition() {
		return IsEntityPositionFrozen(this.scriptID);
	}

	set freezePosition(state: boolean) {
		FreezeEntityPosition(this.scriptID, state);
	}

	get quaternion() {
		return new Quaternion(this.position.x, this.position.y, this.position.z, this.rotation.z);
	}

	set quaternion(quaternion: Quaternion) {
		this.position = new Vector3(quaternion.x, quaternion.y, quaternion.z);
		this.rotation = this.rotation.clone().setZ(quaternion.w);
	}

	get rotation() {
		const [x, y, z] = GetEntityRotation(this.scriptID);

		return new Vector3(x, y, z);
	}

	set rotation(rotation: Vector3) {
		SetEntityRotation(this.scriptID, rotation.x, rotation.y, rotation.z, 2, true);
	}

	get position() {
		const [x, y, z] = GetEntityCoords(this.scriptID);

		return new Vector3(x, y, z);
	}

	set position(pos: Vector3) {
		SetEntityCoords(this.scriptID, pos.x, pos.y, pos.z, false, false, false, true);
	}

	get dimension(): number {
		return GetEntityRoutingBucket(this.scriptID);
	}

	set dimension(dimension: number) {
		SetEntityRoutingBucket(this.scriptID, dimension);
	}

	destroy() {
		DeleteEntity(this.scriptID);
	}
}
