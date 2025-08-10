import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
export declare class AreaBlip extends Blip {
    static create(position: Vector3, width: number, height: number): AreaBlip;
    private _width;
    private _height;
    constructor(id: number);
    setAreaSize(width: number, height: number): void;
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
}
