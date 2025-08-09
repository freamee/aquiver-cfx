import { Vector3 } from 'three';
import { NetEntity } from './NetEntity';

/** RopeTextures needs to be loaded, before creating the entity. */
export class Rope {
	static async loadRopeTextures() {
		RopeLoadTextures();

		await waitFor(() => RopeAreTexturesLoaded());
	}

	static create(
		position: Vector3,
		type: number,
		length: number = 10.0,
		minLength: number = 5.0,
		maxLength: number = 20.0,
		windingSpeed: number = 1.0
	) {
		const [id] = AddRope(
			position.x,
			position.y,
			position.z,
			0,
			0,
			0,
			length,
			type,
			maxLength,
			minLength,
			windingSpeed,
			false,
			false,
			false,
			1,
			false
		);

		const entity = new Rope(id);

		return entity;
	}

	constructor(private _scriptID: number) {}

	get scriptID() {
		return this._scriptID;
	}

	get isValid() {
		return !!DoesRopeExist(this._scriptID);
	}

	get length() {
		return this._length;
	}

	set length(length: number) {
		RopeForceLength(this._scriptID, length);
	}

	get type() {
		return this._type;
	}

	get maxLength() {
		return this._maxLength;
	}

	get minLength() {
		return this._minLength;
	}

	get windingSpeed() {
		return this._windingSpeed;
	}

	get shadowEnabled() {
		return this._shadowEnabled;
	}

	set shadowEnabled(state: boolean) {
		// @ts-ignore
		RopeDrawShadowEnabled(this._scriptID, state);

		this._shadowEnabled = state;
	}

	activatePhysics(): void {
		ActivatePhysics(this._scriptID);
	}

	attachEntity(entity: NetEntity, position: Vector3): void {
		AttachRopeToEntity(
			this._scriptID,
			entity.scriptID,
			position.x,
			position.y,
			position.z,
			false
		);
	}

	attachEntities(
		entityOne: NetEntity,
		entityOneOffset: Vector3,
		entityTwo: NetEntity,
		entityTwoOffset: Vector3,
		length: number = this.length
	): void {
		const firstPos = entityOne.getOffset(entityOneOffset);
		const secondPos = entityTwo.getOffset(entityTwoOffset);

		AttachEntitiesToRope(
			this._scriptID,
			entityOne.scriptID,
			entityTwo.scriptID,
			firstPos.x,
			firstPos.y,
			firstPos.z,
			secondPos.x,
			secondPos.y,
			secondPos.z,
			length,
			false,
			false,
			// @ts-ignore
			null,
			null
		);
	}

	destroy() {
		DeleteRope(this._scriptID);
	}
}
