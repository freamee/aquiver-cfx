import { Vector3 } from 'three';
import { NetEntity } from './NetEntity';
export declare class NetProp extends NetEntity {
    private _scriptID;
    static getByScriptId(id: number): NetProp;
    static getByNetId(id: number): NetProp;
    protected _stateBag: StateBagInterface;
    constructor(_scriptID: number);
    get scriptID(): number;
    attachToEntity(entity: NetEntity, boneIndex: number, offset?: Vector3, rotation?: Vector3, collision?: boolean, fixedRot?: boolean): void;
    attachToEntityPhysically(entity: NetEntity, boneIndex: number, offset?: Vector3, rotation?: Vector3, collision?: boolean, fixedRot?: boolean): void;
    playAnim(dictionary: string, animation: string, loop: boolean, stayInAnim: boolean): void;
    stopAnim(dictionary: string, animation: string): void;
    placeOnGround(): void;
}
