import { NetEntity } from '@/NetEntity';
import { Colshape } from './Colshape';
import { Vector3 } from 'three';
export declare class CircleColshape extends Colshape {
    private _radius;
    constructor(position: Vector3, radius: number);
    get radius(): number;
    set radius(radius: number);
    isPointIn(position: Vector3): boolean;
    isEntityIn(entity: NetEntity): boolean;
}
