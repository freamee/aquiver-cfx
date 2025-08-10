import { WorldObject } from '@/WorldObject';
import { RGBA } from '@aquiver-cfx/shared';
import { Vector3 } from 'three';
export declare class Label extends WorldObject {
    private static _entities;
    private static _group;
    static get all(): Label[];
    static getById(id: number): Label | undefined;
    text: string;
    scale: number;
    color: RGBA;
    center: boolean;
    private _useStreaming;
    private _streamingDistance;
    constructor(text: string, position: Vector3, color?: RGBA, useStreaming?: boolean, streamingDistance?: number);
    get isStreamed(): boolean;
    get useStreaming(): boolean;
    get streamingDistance(): number;
    destroy(): void;
}
