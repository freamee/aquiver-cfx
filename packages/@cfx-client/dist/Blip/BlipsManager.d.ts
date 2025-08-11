import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
import { RadiusBlip } from './RadiusBlip';
import { PointBlip } from './PointBlip';
import { AreaBlip } from './AreaBlip';
export declare class BlipsManager {
    newPoint(position: Vector3): PointBlip;
    newArea(position: Vector3, width: number, height: number): AreaBlip;
    newRadius(position: Vector3, radius: number): RadiusBlip;
    at(id: number): Blip | undefined;
    get all(): Blip[];
    destroyAll(): void;
    findInRange(position: Vector3, range: number): Blip[];
}
