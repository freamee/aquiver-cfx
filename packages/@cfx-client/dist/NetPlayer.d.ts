import { NetEntity } from './NetEntity';
export declare class NetPlayer extends NetEntity {
    private static localPlayer;
    static get local(): NetPlayer;
    static getBySource(source: number | string): NetPlayer;
    static getByScriptId(id: number): NetPlayer;
    static getByNetId(id: number): NetPlayer;
    private _source;
    protected _stateBag: StateBagInterface;
    constructor(source: number | string);
    get isLocalPlayer(): boolean;
    get scriptID(): number;
    get dimension(): number;
    get source(): number;
    get cfxName(): string;
    get playerIndex(): number;
    get isVoiceActive(): boolean;
}
