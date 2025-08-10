import { NetEntity } from './NetEntity';
export declare class NetPed extends NetEntity {
    private _scriptID;
    static getByScriptId(id: number): NetPed;
    static getByNetId(id: number): NetPed;
    protected _stateBag: StateBagInterface;
    constructor(_scriptID: number);
    get scriptID(): number;
}
