import { Vector3 } from 'three';
import { Blip } from './Blip';
export declare class RadiusBlip extends Blip {
    static create(position: Vector3, radius: number): RadiusBlip;
    constructor(id: number);
}
