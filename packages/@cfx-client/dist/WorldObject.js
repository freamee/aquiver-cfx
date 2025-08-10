import { BaseObject } from './BaseObject';
export class WorldObject extends BaseObject {
    static entities = new Map();
    static getByID(id) {
        return this.entities.get(id);
    }
    static get all() {
        return Array.from(this.entities.values());
    }
    static get count() {
        return this.entities.size;
    }
    _position;
    constructor(position) {
        super();
        this._position = position;
        WorldObject.entities.set(this.id, this);
    }
    distanceTo(position) {
        return this.position.distanceTo(position);
    }
    isNearTo(position, distance) {
        return this.distanceTo(position) <= distance;
    }
    get streamingDistance() {
        return -1;
    }
    get position() {
        return this._position;
    }
    set position(pos) {
        this._position = pos;
    }
    destroy() {
        super.destroy();
        WorldObject.entities.delete(this.id);
    }
}
