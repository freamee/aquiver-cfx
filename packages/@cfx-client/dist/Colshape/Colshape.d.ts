import { Vector3 } from 'three';
import { WorldObject } from '../WorldObject';
import { NetEntity } from '@/NetEntity';
export declare abstract class Colshape extends WorldObject {
    protected static entities: Map<number, Colshape>;
    static get all(): Colshape[];
    abstract isPointIn(position: Vector3): boolean;
    abstract isEntityIn(entity: NetEntity): boolean;
    protected constructor(position: Vector3);
    onEnter(): void;
    onLeave(): void;
    destroy(): void;
}
