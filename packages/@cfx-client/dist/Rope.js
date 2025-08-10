import { waitFor } from '@aquiver-cfx/shared';
/** RopeTextures needs to be loaded, before creating the entity. */
export class Rope {
    _scriptID;
    static async loadRopeTextures() {
        RopeLoadTextures();
        await waitFor(() => RopeAreTexturesLoaded());
    }
    static create(position, type, length = 10.0, minLength = 5.0, maxLength = 20.0, windingSpeed = 1.0) {
        const [id] = AddRope(position.x, position.y, position.z, 0, 0, 0, length, type, maxLength, minLength, windingSpeed, false, false, false, 1, false);
        const entity = new Rope(id);
        return entity;
    }
    constructor(_scriptID) {
        this._scriptID = _scriptID;
    }
    get scriptID() {
        return this._scriptID;
    }
    get isValid() {
        return !!DoesRopeExist(this._scriptID);
    }
    get length() {
        return GetRopeLength(this._scriptID);
    }
    set length(length) {
        RopeForceLength(this._scriptID, length);
    }
    set shadowEnabled(state) {
        // @ts-ignore
        RopeDrawShadowEnabled(this._scriptID, state);
    }
    detachEntity(entity) {
        DetachRopeFromEntity(this._scriptID, entity.scriptID);
    }
    activatePhysics() {
        ActivatePhysics(this._scriptID);
    }
    attachEntity(entity, position) {
        AttachRopeToEntity(this._scriptID, entity.scriptID, position.x, position.y, position.z, false);
    }
    attachEntities(entityOne, entityOneOffset, entityTwo, entityTwoOffset, length = this.length) {
        const firstPos = entityOne.getOffset(entityOneOffset);
        const secondPos = entityTwo.getOffset(entityTwoOffset);
        AttachEntitiesToRope(this._scriptID, entityOne.scriptID, entityTwo.scriptID, firstPos.x, firstPos.y, firstPos.z, secondPos.x, secondPos.y, secondPos.z, length, false, false, 
        // @ts-ignore
        null, null);
    }
    destroy() {
        DeleteRope(this._scriptID);
    }
}
