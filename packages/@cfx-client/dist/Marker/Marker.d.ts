import { RGBA, Vector3 } from '@aquiver-cfx/shared';
import { WorldObject } from '../GameObject';
export declare class Marker extends WorldObject {
    protected static _entities: Map<number, Marker>;
    private static _group;
    static get all(): Marker[];
    static getById(id: number): Marker | undefined;
    markerType: number;
    color: RGBA;
    scale: Vector3;
    rotation: Vector3;
    direction: Vector3;
    faceCamera: boolean;
    rotate: boolean;
    bobUpAndDown: boolean;
    private _useStreaming;
    private _streamingDistance;
    constructor(type: number, position: Vector3, color?: RGBA, useStreaming?: boolean, streamingDistance?: number);
    get isStreamed(): boolean;
    get useStreaming(): boolean;
    get streamingDistance(): number;
    destroy(): void;
}
