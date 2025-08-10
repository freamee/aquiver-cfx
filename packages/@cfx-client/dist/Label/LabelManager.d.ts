import { Vector3 } from 'three';
import { RGBA } from '@aquiver-cfx/shared';
import { Label } from './Label';
export declare class LabelsManager {
    new(text: string, position: Vector3, color?: RGBA, useStreaming?: boolean, streamingDistance?: number): Label;
    at(id: number): Label | undefined;
    get all(): Label[];
    get streamed(): Label[];
    destroyAll(): void;
    findInRange(position: Vector3, range: number): Label[];
}
