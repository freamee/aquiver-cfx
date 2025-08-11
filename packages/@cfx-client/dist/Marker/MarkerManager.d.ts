import { Vector3 } from '@aquiver-cfx/shared';
import { Marker } from './Marker';
export declare class MarkersManager {
    new(...args: ConstructorParameters<typeof Marker>): Marker;
    at(id: number): Marker | undefined;
    get all(): Marker[];
    get streamed(): Marker[];
    destroyAll(): void;
    findInRange(position: Vector3, range: number): Marker[];
}
