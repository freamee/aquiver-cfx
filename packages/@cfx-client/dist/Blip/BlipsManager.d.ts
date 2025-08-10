import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
export declare class BlipsManager {
    at(id: number): Blip | undefined;
    get all(): Blip[];
    destroyAll(): void;
    findInRange(position: Vector3, range: number): Blip[];
}
