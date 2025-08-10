import { Blip } from './Blip';
import { Vector3 } from 'three';
export declare class PointBlip extends Blip {
    static create(position: Vector3): PointBlip;
    constructor(id: number);
}
