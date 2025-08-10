import { BaseObject } from './BaseObject';
import { WorldObject } from './WorldObject';
export declare class StreamingGroup extends BaseObject {
    protected static entities: Map<number, StreamingGroup>;
    static get all(): StreamingGroup[];
    private _maxEntitiesInStream;
    private _entities;
    private _streamedEntities;
    constructor(maxEntitiesInStream: number);
    addPool(worldObject: WorldObject): void;
    removePool(worldObject: WorldObject): void;
    isStreamedIn(worldObject: WorldObject): boolean;
    get entities(): Map<number, WorldObject>;
    get maxEntitiesInStream(): number;
    update(): void;
    destroy(): void;
}
