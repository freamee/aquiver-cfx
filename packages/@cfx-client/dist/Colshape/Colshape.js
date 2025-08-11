import { WorldObject } from '../GameObject';
import { NetPlayer } from '../Entity';
export class Colshape extends WorldObject {
    static _entities = new Map();
    static get all() {
        return [...this._entities.values()];
    }
    static getById(id) {
        return this._entities.get(id);
    }
    constructor(position) {
        super(position);
        Colshape._entities.set(this.id, this);
    }
    onEnter() {
        emit('enterColshape', this.id);
    }
    onLeave() {
        emit('leaveColshape', this.id);
    }
    destroy() {
        if (lastColshapes.has(this.id)) {
            lastColshapes.delete(this.id);
            this.onLeave();
        }
        super.destroy();
        Colshape._entities.delete(this.id);
    }
}
const lastColshapes = new Set();
setInterval(() => {
    const local = NetPlayer.local;
    const currentlyStreamed = new Set();
    for (const entity of Colshape.all) {
        currentlyStreamed.add(entity.id);
        const isInside = entity.isEntityIn(local);
        if (isInside && !lastColshapes.has(entity.id)) {
            lastColshapes.add(entity.id);
            entity.onEnter();
        }
        if (!isInside && lastColshapes.has(entity.id)) {
            lastColshapes.delete(entity.id);
            entity.onLeave();
        }
    }
    for (const id of lastColshapes) {
        if (currentlyStreamed.has(id))
            continue;
        const entity = Colshape.getById(id);
        if (entity) {
            entity.onLeave();
        }
        lastColshapes.delete(id);
    }
}, 500);
