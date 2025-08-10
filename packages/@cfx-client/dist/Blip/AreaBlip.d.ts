import { Blip } from './Blip';
import { Vector3 } from 'three';
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
