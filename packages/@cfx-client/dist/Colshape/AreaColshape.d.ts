import { Colshape } from './Colshape';
import { NetEntity } from '../Entity';
import { Vector3 } from '@aquiver-cfx/shared';
export declare class AreaColshape extends Colshape {
    private _width;
    private _height;
    private _rotation;
    constructor(position: Vector3, width: number, height: number, rotation: number);
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(val: number);
    get rotation(): number;
    set rotation(rot: number);
    isPointIn(position: Vector3): boolean;
    isEntityIn(entity: NetEntity): boolean;
}
