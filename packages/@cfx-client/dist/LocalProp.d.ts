import { Vector3 } from 'three';
import { NetProp } from './NetProp';
/** Model needs to be loaded before creating the entity. */
export declare class LocalProp extends NetProp {
    private static _entities;
    private static _group;
    static get all(): LocalProp[];
    private _useStreaming;
    private _streamingDistance;
    constructor(modelHash: string | number, position: Vector3, rotation?: Vector3, useStreaming?: boolean, streamingDistance?: number);
    get isStreamed(): boolean;
    get useStreaming(): boolean;
    get streamingDistance(): number;
    destroy(): void;
}
