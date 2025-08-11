import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
export declare class RadiusBlip extends Blip {
    constructor(position: Vector3, radius: number, remoteId?: number);
    protected createBlip(): number;
}
