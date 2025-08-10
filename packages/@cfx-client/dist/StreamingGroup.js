import { BaseObject } from './BaseObject';
import { NetPlayer } from './NetPlayer';
export class StreamingGroup extends BaseObject {
    static entities = new Map();
    static get all() {
        return [...this.entities.values()];
    }
    _maxEntitiesInStream;
    _entities = new Map();
    _streamedEntities = new Set();
    constructor(maxEntitiesInStream) {
        super();
        this._maxEntitiesInStream = maxEntitiesInStream;
        StreamingGroup.entities.set(this.id, this);
    }
    addPool(worldObject) {
        this._entities.set(worldObject.id, worldObject);
    }
    removePool(worldObject) {
        this._entities.delete(worldObject.id);
        this._streamedEntities.delete(worldObject);
    }
    isStreamedIn(worldObject) {
        return this._streamedEntities.has(worldObject);
    }
    get entities() {
        return this._entities;
    }
    get maxEntitiesInStream() {
        return this._maxEntitiesInStream;
    }
    update() {
        const local = NetPlayer.local;
        const pos = local.position;
        const streamedSet = this._streamedEntities;
        const nearbyEntities = [...this._entities.values()].filter((entity) => {
            return entity.position.distanceTo(pos) <= entity.streamingDistance;
        });
        const sortedEntities = nearbyEntities.sort((a, b) => {
            return a.position.distanceTo(pos) - b.position.distanceTo(pos);
        });
        const toStreamIn = sortedEntities.slice(0, this._maxEntitiesInStream);
        const toStreamOut = [...streamedSet.values()].filter((ent) => !toStreamIn.some((entity) => entity === ent));
        for (const entity of toStreamIn) {
            if (streamedSet.has(entity))
                continue;
            streamedSet.add(entity);
        }
        for (const entity of toStreamOut) {
            streamedSet.delete(entity);
        }
    }
    destroy() {
        super.destroy();
        StreamingGroup.entities.delete(this.id);
        this._streamedEntities.clear();
    }
}
