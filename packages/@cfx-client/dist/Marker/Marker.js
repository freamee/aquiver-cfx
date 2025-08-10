import { StreamingGroup } from '@/StreamingGroup';
import { WorldObject } from '@/WorldObject';
import { RGBA } from '@aquiver-cfx/shared';
import { Vector3 } from 'three';
export class Marker extends WorldObject {
    static _entities = new Map();
    static _group = new StreamingGroup(64);
    static get all() {
        return [...this._entities.values()];
    }
    static getById(id) {
        return this._entities.get(id);
    }
    markerType = 0;
    color = RGBA.white;
    scale = new Vector3(1, 1, 1);
    rotation = new Vector3(0, 0, 0);
    direction = new Vector3(0, 0, 0);
    faceCamera = false;
    rotate = false;
    bobUpAndDown = false;
    _useStreaming = false;
    _streamingDistance = -1;
    constructor(type, position, color = RGBA.white, useStreaming = true, streamingDistance = 128) {
        super(position);
        this.markerType = type;
        this.color = color;
        this._useStreaming = useStreaming;
        this._streamingDistance = streamingDistance;
        if (this._useStreaming) {
            Marker._group.addPool(this);
        }
        Marker._entities.set(this.id, this);
    }
    get isStreamed() {
        if (this._useStreaming) {
            return Marker._group.isStreamedIn(this);
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
        Marker._entities.delete(this.id);
        if (this._useStreaming) {
            Marker._group.removePool(this);
        }
    }
}
