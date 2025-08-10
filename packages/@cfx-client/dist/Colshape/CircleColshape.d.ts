import { Vector3 } from '@aquiver-cfx/shared';
import { NetEntity } from '../Entity';
import { Colshape } from './Colshape';
export declare class CircleColshape extends Colshape {
    private _radius;
    constructor(position: Vector3, radius: number);
    get radius(): number;
    set radius(radius: number);
    isPointIn(position: Vector3): boolean;
    isEntityIn(entity: NetEntity): boolean;
}
