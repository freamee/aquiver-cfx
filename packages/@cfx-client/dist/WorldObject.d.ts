import { BaseObject } from './BaseObject';
import { Vector3 } from 'three';
export declare abstract class WorldObject extends BaseObject {
    protected static entities: Map<number, WorldObject>;
    static getByID(id: number): WorldObject | undefined;
    static get all(): WorldObject[];
    static get count(): number;
    private _position;
    constructor(position: Vector3);
    distanceTo(position: Vector3): number;
    isNearTo(position: Vector3, distance: number): boolean;
    get streamingDistance(): number;
    get position(): Vector3;
    set position(pos: Vector3);
    destroy(): void;
}
