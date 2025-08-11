import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
export declare class PointBlip extends Blip {
    constructor(position: Vector3, remoteId?: number);
    protected createBlip(): number;
}
