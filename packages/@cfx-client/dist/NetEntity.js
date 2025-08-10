import { Quaternion, Vector3 } from 'three';
import { WorldObject } from './WorldObject';
export class NetEntity extends WorldObject {
    constructor() {
        super(new Vector3());
    }
    setStateBag(key, value, replicated) {
        this._stateBag.set(key, value, replicated);
    }
    getStateBag(key) {
        return this._stateBag[key];
    }
    isAttached() {
        return !!IsEntityAttached(this.scriptID);
    }
    isAttachedTo(entity) {
        return !!IsEntityAttachedToEntity(this.scriptID, entity.scriptID);
    }
    detach() {
        DetachEntity(this.scriptID, true, true);
    }
    setNoCollision(entity, toggle) {
        SetEntityNoCollisionEntity(this.scriptID, entity.scriptID, toggle);
    }
    hasClearLosToEntity(entity, traceType = 17) {
        return !!HasEntityClearLosToEntity(this.scriptID, entity.scriptID, traceType);
    }
    hasClearLosToEntityInFront(entity) {
        return !!HasEntityClearLosToEntityInFront(this.scriptID, entity.scriptID);
    }
    hasBeenDamagedBy(entity) {
        return !!HasEntityBeenDamagedByEntity(this.scriptID, entity.scriptID, true);
    }
    hasBeenDamagedByWeapon(weaponHash) {
        return !!HasEntityBeenDamagedByWeapon(this.scriptID, Number(weaponHash), 0);
    }
    hasBeenDamagedByAnyWeapon() {
        return !!HasEntityBeenDamagedByWeapon(this.scriptID, 0, 2);
    }
    hasBeenDamagedByAnyMeleeWeapon() {
        return !!HasEntityBeenDamagedByWeapon(this.scriptID, 0, 1);
    }
    clearLastWeaponDamage() {
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
    getOffset(offset) {
        const [x, y, z] = GetOffsetFromEntityInWorldCoords(this.scriptID, offset.x, offset.y, offset.z);
        return new Vector3(x, y, z);
    }
    getOffsetWithWorld(worldPosition) {
        const [x, y, z] = GetOffsetFromEntityGivenWorldCoords(this.scriptID, worldPosition.x, worldPosition.y, worldPosition.z);
        return new Vector3(x, y, z);
    }
    resetAlpha() {
        ResetEntityAlpha(this.scriptID);
    }
    setOutline(r = 255, g = 255, b = 255, a = 255) {
        SetEntityDrawOutline(this.scriptID, true);
        SetEntityDrawOutlineShader(0);
        SetEntityDrawOutlineColor(r, g, b, a);
    }
    clearOutline() {
        SetEntityDrawOutline(this.scriptID, false);
    }
    playSoundFromEntity(audioName, audioRef, isNetwork = false) {
        const id = GetSoundId();
        PlaySoundFromEntity(id, audioName, this.scriptID, audioRef, isNetwork, 0);
        ReleaseSoundId(id);
        return id;
    }
    isNetOwner(playerIndex) {
        return this.netOwner === playerIndex;
    }
    hasBoneByName(boneName) {
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
    set velocity(value) {
        SetEntityVelocity(this.scriptID, value.x, value.y, value.z);
    }
    get isInWater() {
        return !!IsEntityInWater(this.scriptID);
    }
    get isOnScreen() {
        return !!IsEntityOnScreen(this.scriptID);
    }
    get isUpright() {
        return !!IsEntityUpright(this.scriptID, 0);
    }
    get isUpsideDown() {
        return !!IsEntityUpsidedown(this.scriptID);
    }
    get isInAir() {
        return !!IsEntityInAir(this.scriptID);
    }
    get visible() {
        return !!IsEntityVisible(this.scriptID);
    }
    set visible(state) {
        SetEntityVisible(this.scriptID, state, false);
    }
    get alpha() {
        return GetEntityAlpha(this.scriptID);
    }
    set alpha(alpha) {
        SetEntityAlpha(this.scriptID, alpha, false);
    }
    get freezePosition() {
        return !!IsEntityPositionFrozen(this.scriptID);
    }
    set freezePosition(state) {
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
    set position(pos) {
        super.position = pos;
        SetEntityCoords(this.scriptID, pos.x, pos.y, pos.z, true, true, false, false);
    }
    get positionNoOffset() {
        return super.position;
    }
    set positionNoOffset(pos) {
        super.position = pos;
        SetEntityCoordsNoOffset(this.scriptID, pos.x, pos.y, pos.z, true, true, false);
    }
    get rotation() {
        const [x, y, z] = GetEntityRotation(this.scriptID, 2);
        return new Vector3(x, y, z);
    }
    set rotation(rotation) {
        SetEntityRotation(this.scriptID, rotation.x, rotation.y, rotation.z, 2, true);
    }
    get quaternion() {
        const [x, y, z, w] = GetEntityQuaternion(this.scriptID);
        return new Quaternion(x, y, z, w);
    }
    set quaternion(quaternion) {
        SetEntityQuaternion(this.scriptID, quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
    get heading() {
        return GetEntityHeading(this.scriptID);
    }
    set heading(heading) {
        SetEntityHeading(this.scriptID, heading);
    }
    set invincible(state) {
        SetEntityInvincible(this.scriptID, state);
    }
    get health() {
        return GetEntityHealth(this.scriptID);
    }
    set health(amount) {
        SetEntityHealth(this.scriptID, amount);
    }
    get maxHealth() {
        return GetEntityMaxHealth(this.scriptID);
    }
    set maxHealth(amount) {
        SetEntityMaxHealth(this.scriptID, amount);
    }
    get collision() {
        return !!GetEntityCollisionDisabled(this.scriptID);
    }
    set collision(state) {
        SetEntityCollision(this.scriptID, state, true);
    }
    toggleCollision(toggle, keepPhysics) {
        SetEntityCollision(this.scriptID, toggle, keepPhysics);
    }
    set hasGravity(state) {
        SetEntityHasGravity(this.scriptID, state);
    }
}
