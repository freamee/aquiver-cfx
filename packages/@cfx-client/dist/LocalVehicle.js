import { Vector3 } from 'three';
import { NetVehicle } from './NetVehicle';
import { StreamingGroup } from './StreamingGroup';
/** Vehicle model needs to be loaded before creating the entity. */
export class LocalVehicle extends NetVehicle {
    static _entities = new Map();
    static _group = new StreamingGroup(64);
    static get all() {
        return [...this._entities.values()];
    }
    _useStreaming = false;
    _streamingDistance = 256;
    constructor(modelHash, position, rotation = new Vector3(), useStreaming = true, streamingDistance = 256) {
        super(CreateVehicle(modelHash, position.x, position.y, position.z, rotation.z, false, true));
        this._useStreaming = useStreaming;
        this._streamingDistance = streamingDistance;
        if (this._useStreaming) {
            LocalVehicle._group.addPool(this);
        }
        LocalVehicle._entities.set(this.id, this);
    }
    get isStreamed() {
        if (this._useStreaming) {
            return LocalVehicle._group.isStreamedIn(this);
        }
        return true;
    }
    get useStreaming() {
        return this._useStreaming;
    }
    get streamingDistance() {
        return this._streamingDistance;
    }
    destroy() {
        super.destroy();
        if (this._useStreaming) {
            LocalVehicle._group.removePool(this);
        }
        LocalVehicle._entities.delete(this.id);
        DeleteVehicle(this.scriptID);
    }
}
