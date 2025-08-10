import { NetEntity } from './NetEntity';
export class NetPlayer extends NetEntity {
    static localPlayer;
    static get local() {
        if (!this.localPlayer) {
            const playerIndex = PlayerId();
            const localSource = GetPlayerServerId(playerIndex);
            this.localPlayer = new NetPlayer(localSource);
        }
        return this.localPlayer;
    }
    static getBySource(source) {
        return new NetPlayer(source);
    }
    static getByScriptId(id) {
        const playerIndex = NetworkGetPlayerIndexFromPed(id);
        const targetSource = GetPlayerServerId(playerIndex);
        return new NetPlayer(targetSource);
    }
    static getByNetId(id) {
        const entity = NetworkGetEntityFromNetworkId(id);
        const playerIndex = NetworkGetPlayerIndexFromPed(entity);
        const targetSource = GetPlayerServerId(playerIndex);
        return new NetPlayer(targetSource);
    }
    _source;
    _stateBag;
    constructor(source) {
        super();
        this._source = source;
        this._stateBag = Player(this._source).state;
    }
    get isLocalPlayer() {
        return PlayerId() === this.playerIndex;
    }
    get scriptID() {
        return GetPlayerPed(this.playerIndex);
    }
    get dimension() {
        return this.getStateBag('PLAYER_DIMENSION') ?? 0;
    }
    get source() {
        return Number(this._source);
    }
    get cfxName() {
        return GetPlayerName(this.playerIndex);
    }
    get playerIndex() {
        return GetPlayerFromServerId(this.source);
    }
    get isVoiceActive() {
        return !!MumbleIsPlayerTalking(this.playerIndex);
    }
}
