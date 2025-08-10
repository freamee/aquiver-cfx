import { WorldObject } from '../GameObject';
import { type NetEntity } from '../Entity';
import { Vector3 } from '@aquiver-cfx/shared';
export declare abstract class Colshape extends WorldObject {
    protected static entities: Map<number, Colshape>;
    static get all(): Colshape[];
    static getById(id: number): Colshape | undefined;
    abstract isPointIn(position: Vector3): boolean;
    abstract isEntityIn(entity: NetEntity): boolean;
    protected constructor(position: Vector3);
    onEnter(): void;
    onLeave(): void;
    destroy(): void;
}
