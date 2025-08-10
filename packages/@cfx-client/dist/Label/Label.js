import { StreamingGroup } from '@/StreamingGroup';
import { WorldObject } from '@/WorldObject';
import { RGBA } from '@aquiver-cfx/shared';
export class Label extends WorldObject {
    static _entities = new Map();
    static _group = new StreamingGroup(64);
    static get all() {
        return [...this._entities.values()];
    }
    static getById(id) {
        return this._entities.get(id);
    }
    text = '';
    scale = 1.0;
    color = RGBA.white;
    center = true;
    _useStreaming = false;
    _streamingDistance = -1;
    constructor(text, position, color = RGBA.white, useStreaming = true, streamingDistance = 32) {
        super(position);
        this.text = text;
        this.color = color;
        this._useStreaming = useStreaming;
        this._streamingDistance = streamingDistance;
        if (this._useStreaming) {
            Label._group.addPool(this);
        }
        Label._entities.set(this.id, this);
    }
    get isStreamed() {
        if (this._useStreaming) {
            return Label._group.isStreamedIn(this);
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
        Label._entities.delete(this.id);
        if (this._useStreaming) {
            Label._group.removePool(this);
        }
    }
}
