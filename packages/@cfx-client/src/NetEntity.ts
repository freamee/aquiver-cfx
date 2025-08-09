import { Quaternion, Vector3 } from 'three';
import { WorldObject } from './WorldObject';

export abstract class NetEntity extends WorldObject {
	abstract get scriptID(): number;

	protected abstract _stateBag: StateBagInterface;

	protected constructor() {
		super(new Vector3());
	}

	setStateBag<T = unknown>(key: string, value: T, replicated: boolean) {
		this._stateBag.set(key, value, replicated);
	}

	getStateBag<T = unknown>(key: string): T {
		return this._stateBag[key];
	}

	isAttached() {
		return !!IsEntityAttached(this.scriptID);
	}

	isAttachedTo(entity: NetEntity) {
		return !!IsEntityAttachedToEntity(this.scriptID, entity.scriptID);
	}

	detach() {
		DetachEntity(this.scriptID, true, true);
	}

	setNoCollision(entity: NetEntity, toggle: boolean): void {
		SetEntityNoCollisionEntity(this.scriptID, entity.scriptID, toggle);
	}

	hasClearLosToEntity(entity: NetEntity, traceType = 17): boolean {
		return !!HasEntityClearLosToEntity(this.scriptID, entity.scriptID, traceType);
	}

	hasClearLosToEntityInFront(entity: NetEntity): boolean {
		return !!HasEntityClearLosToEntityInFront(this.scriptID, entity.scriptID);
	}

	hasBeenDamagedBy(entity: NetEntity): boolean {
		return !!HasEntityBeenDamagedByEntity(this.scriptID, entity.scriptID, true);
	}

	hasBeenDamagedByWeapon(weaponHash: number): boolean {
		return !!HasEntityBeenDamagedByWeapon(this.scriptID, Number(weaponHash), 0);
	}

	hasBeenDamagedByAnyWeapon(): boolean {
		return !!HasEntityBeenDamagedByWeapon(this.scriptID, 0, 2);
	}

	hasBeenDamagedByAnyMeleeWeapon(): boolean {
		return !!HasEntityBeenDamagedByWeapon(this.scriptID, 0, 1);
	}

	clearLastWeaponDamage(): void {
		ClearEntityLastWeaponDamage(this.scriptID);
	}

	isDead() {
		return !!IsEntityDead(this.scriptID);
	}

	isPedDeadOrDying() {
		return !!IsPedDeadOrDying(this.scriptID, true);
	}

	isAlive() {
		return !this.isDead();
	}

	getOffset(offset: Vector3): Vector3 {
		const [x, y, z] = GetOffsetFromEntityInWorldCoords(
			this.scriptID,
			offset.x,
			offset.y,
			offset.z
		);

		return new Vector3(x, y, z);
	}

	getOffsetWithWorld(worldPosition: Vector3): Vector3 {
		const [x, y, z] = GetOffsetFromEntityGivenWorldCoords(
			this.scriptID,
			worldPosition.x,
			worldPosition.y,
			worldPosition.z
		);

		return new Vector3(x, y, z);
	}

	resetAlpha() {
		ResetEntityAlpha(this.scriptID);
	}

	setOutline(r: number = 255, g: number = 255, b: number = 255, a: number = 255) {
		SetEntityDrawOutline(this.scriptID, true);
		SetEntityDrawOutlineShader(0);
		SetEntityDrawOutlineColor(r, g, b, a);
	}

	clearOutline() {
		SetEntityDrawOutline(this.scriptID, false);
	}

	playSoundFromEntity(audioName: string, audioRef: string, isNetwork: boolean = false) {
		const id = GetSoundId();

		PlaySoundFromEntity(id, audioName, this.scriptID, audioRef, isNetwork, 0);

		ReleaseSoundId(id);

		return id;
	}

	isNetOwner(playerIndex: number) {
		return this.netOwner === playerIndex;
	}

	hasBoneByName(boneName: string) {
		return GetEntityBoneIndexByName(this.scriptID, boneName) !== -1;
	}

	get isNetworked() {
		return !!NetworkGetEntityIsNetworked(this.scriptID);
	}

	get networkId() {
		return NetworkGetNetworkIdFromEntity(this.scriptID);
	}

	get netOwner() {
		return NetworkGetEntityOwner(this.scriptID);
	}

	get isValid() {
		return !!DoesEntityExist(this.scriptID);
	}

	get model() {
		return GetEntityModel(this.scriptID);
	}

	get velocity() {
		const [x, y, z] = GetEntityVelocity(this.scriptID);

		return new Vector3(x, y, z);
	}

	set velocity(value: Vector3) {
		SetEntityVelocity(this.scriptID, value.x, value.y, value.z);
	}

	get isInWater(): boolean {
		return !!IsEntityInWater(this.scriptID);
	}

	get isOnScreen(): boolean {
		return !!IsEntityOnScreen(this.scriptID);
	}

	get isUpright(): boolean {
		return !!IsEntityUpright(this.scriptID, 0);
	}

	get isUpsideDown(): boolean {
		return !!IsEntityUpsidedown(this.scriptID);
	}

	get isInAir(): boolean {
		return !!IsEntityInAir(this.scriptID);
	}

	get visible() {
		return !!IsEntityVisible(this.scriptID);
	}

	set visible(state: boolean) {
		SetEntityVisible(this.scriptID, state, false);
	}

	get alpha() {
		return GetEntityAlpha(this.scriptID);
	}

	set alpha(alpha: number) {
		SetEntityAlpha(this.scriptID, alpha, false);
	}

	get freezePosition() {
		return !!IsEntityPositionFrozen(this.scriptID);
	}

	set freezePosition(state: boolean) {
		FreezeEntityPosition(this.scriptID, state);
	}

	get matrix() {
		const [forward, right, up] = GetEntityMatrix(this.scriptID);

		return {
			forward: new Vector3(...forward),
			right: new Vector3(...right),
			up: new Vector3(...up)
		};
	}

	get position() {
		if (this.isValid) {
			const [x, y, z] = GetEntityCoords(this.scriptID, true);

			return new Vector3(x, y, z);
		}

		return super.position;
	}

	set position(pos: Vector3) {
		super.position = pos;

		SetEntityCoords(this.scriptID, pos.x, pos.y, pos.z, true, true, false, false);
	}

	get positionNoOffset() {
		return super.position;
	}

	set positionNoOffset(pos: Vector3) {
		super.position = pos;

		SetEntityCoordsNoOffset(this.scriptID, pos.x, pos.y, pos.z, true, true, false);
	}

	get rotation() {
		const [x, y, z] = GetEntityRotation(this.scriptID, 2);

		return new Vector3(x, y, z);
	}

	set rotation(rotation: Vector3) {
		SetEntityRotation(this.scriptID, rotation.x, rotation.y, rotation.z, 2, true);
	}

	get quaternion() {
		const [x, y, z, w] = GetEntityQuaternion(this.scriptID);

		return new Quaternion(x, y, z, w);
	}

	set quaternion(quaternion: Quaternion) {
		SetEntityQuaternion(this.scriptID, quaternion.x, quaternion.y, quaternion.z, quaternion.w);
	}

	get heading() {
		return GetEntityHeading(this.scriptID);
	}

	set heading(heading: number) {
		SetEntityHeading(this.scriptID, heading);
	}

	set invincible(state: boolean) {
		SetEntityInvincible(this.scriptID, state);
	}

	get health() {
		return GetEntityHealth(this.scriptID);
	}

	set health(amount: number) {
		SetEntityHealth(this.scriptID, amount);
	}

	get maxHealth() {
		return GetEntityMaxHealth(this.scriptID);
	}

	set maxHealth(amount: number) {
		SetEntityMaxHealth(this.scriptID, amount);
	}

	get collision() {
		return !!GetEntityCollisionDisabled(this.scriptID);
	}

	set collision(state: boolean) {
		SetEntityCollision(this.scriptID, state, true);
	}

	toggleCollision(toggle: boolean, keepPhysics: boolean) {
		SetEntityCollision(this.scriptID, toggle, keepPhysics);
	}

	set hasGravity(state: boolean) {
		SetEntityHasGravity(this.scriptID, state);
	}
}
