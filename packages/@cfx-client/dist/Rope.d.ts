import { Vector3 } from 'three';
import { NetEntity } from './NetEntity';
/** RopeTextures needs to be loaded, before creating the entity. */
export declare class Rope {
    private _scriptID;
    static loadRopeTextures(): Promise<void>;
    static create(position: Vector3, type: number, length?: number, minLength?: number, maxLength?: number, windingSpeed?: number): Rope;
    constructor(_scriptID: number);
    get scriptID(): number;
    get isValid(): boolean;
    get length(): number;
    set length(length: number);
    set shadowEnabled(state: boolean);
    detachEntity(entity: NetEntity): void;
    activatePhysics(): void;
    attachEntity(entity: NetEntity, position: Vector3): void;
    attachEntities(entityOne: NetEntity, entityOneOffset: Vector3, entityTwo: NetEntity, entityTwoOffset: Vector3, length?: number): void;
    destroy(): void;
}
