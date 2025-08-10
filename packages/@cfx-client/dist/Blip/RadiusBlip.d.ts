import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
export declare class RadiusBlip extends Blip {
    static create(position: Vector3, radius: number): RadiusBlip;
    constructor(id: number);
}
