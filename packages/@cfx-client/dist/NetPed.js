import { NetEntity } from './NetEntity';
export class NetPed extends NetEntity {
    _scriptID;
    static getByScriptId(id) {
        return new NetPed(id);
    }
    static getByNetId(id) {
        const entity = NetworkGetEntityFromNetworkId(id);
        return new NetPed(entity);
    }
    _stateBag;
    constructor(_scriptID) {
        super();
        this._scriptID = _scriptID;
        this._stateBag = Entity(this.scriptID).state;
    }
    get scriptID() {
        return this._scriptID;
    }
}
