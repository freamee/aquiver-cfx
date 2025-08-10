import { Vector3 } from 'three';
import { NetPed } from './NetPed';
/** Model needs to be loaded before creating the entity. */
export declare class LocalPed extends NetPed {
    private static _entities;
    private static _group;
    static get all(): LocalPed[];
    private _useStreaming;
    private _streamingDistance;
    constructor(modelHash: string | number, position: Vector3, heading?: number, useStreaming?: boolean, streamingDistance?: number);
    get isStreamed(): boolean;
    get useStreaming(): boolean;
    get streamingDistance(): number;
    destroy(): void;
}
