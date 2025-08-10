import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
export declare class PointBlip extends Blip {
    static create(position: Vector3): PointBlip;
    constructor(id: number);
}
