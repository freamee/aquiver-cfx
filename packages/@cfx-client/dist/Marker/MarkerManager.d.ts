import { Vector3 } from 'three';
import { Marker } from './Marker';
import { RGBA } from '@aquiver-cfx/shared';
export declare class MarkersManager {
    new(type: number, position: Vector3, color?: RGBA, useStreaming?: boolean, streamingDistance?: number): Marker;
    at(id: number): Marker | undefined;
    get all(): Marker[];
    get streamed(): Marker[];
    destroyAll(): void;
    findInRange(position: Vector3, range: number): Marker[];
}
