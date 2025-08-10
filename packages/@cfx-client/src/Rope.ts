import { Vector3, waitFor } from '@aquiver-cfx/shared';
import { NetEntity } from './Entity';

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
		return GetRopeLength(this._scriptID);
	}

	set length(length: number) {
		RopeForceLength(this._scriptID, length);
	}

	set shadowEnabled(state: boolean) {
		// @ts-ignore
		RopeDrawShadowEnabled(this._scriptID, state);
	}

	detachEntity(entity: NetEntity) {
		DetachRopeFromEntity(this._scriptID, entity.scriptID);
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
