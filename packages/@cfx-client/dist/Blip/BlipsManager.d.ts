import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
import { RadiusBlip } from './RadiusBlip';
import { PointBlip } from './PointBlip';
import { AreaBlip } from './AreaBlip';
export declare class BlipsManager {
    newPoint(...args: Parameters<(typeof PointBlip)['create']>): PointBlip;
    newArea(...args: Parameters<(typeof AreaBlip)['create']>): AreaBlip;
    newRadius(...args: Parameters<(typeof RadiusBlip)['create']>): RadiusBlip;
    at(id: number): Blip | undefined;
    get all(): Blip[];
    destroyAll(): void;
    findInRange(position: Vector3, range: number): Blip[];
}
