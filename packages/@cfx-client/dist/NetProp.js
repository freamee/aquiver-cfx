import { Vector3 } from 'three';
import { NetEntity } from './NetEntity';
export class NetProp extends NetEntity {
    _scriptID;
    static getByScriptId(id) {
        return new NetProp(id);
    }
    static getByNetId(id) {
        const entity = NetworkGetEntityFromNetworkId(id);
        return new NetProp(entity);
    }
    _stateBag;
    constructor(_scriptID) {
        super();
        this._scriptID = _scriptID;
        this._stateBag = Entity(this.scriptID).state;
    }
    get scriptID() {
        return this._scriptID;
    }
    attachToEntity(entity, boneIndex, offset = new Vector3(), rotation = new Vector3(), collision = false, fixedRot = true) {
        AttachEntityToEntity(this.scriptID, entity.scriptID, boneIndex, offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, false, false, collision, false, 2, fixedRot);
    }
    attachToEntityPhysically(entity, boneIndex, offset = new Vector3(), rotation = new Vector3(), collision = false, fixedRot = true) {
        AttachEntityToEntityPhysically(this.scriptID, entity.scriptID, -1, boneIndex, 0.0, 0.0, 0.0, offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, 0.0, fixedRot, true, collision, false, 2);
    }
    playAnim(dictionary, animation, loop, stayInAnim) {
        PlayEntityAnim(this.scriptID, animation, dictionary, 1000.0, loop, stayInAnim, false, 0.0, 0);
    }
    stopAnim(dictionary, animation) {
        StopEntityAnim(this.scriptID, animation, dictionary, 3);
    }
    placeOnGround() {
        PlaceObjectOnGroundProperly(this.scriptID);
    }
}
