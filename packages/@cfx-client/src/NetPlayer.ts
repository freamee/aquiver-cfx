import { NetEntity } from './NetEntity';

export class NetPlayer extends NetEntity {
	private static localPlayer: NetPlayer;

	static get local() {
		if (!this.localPlayer) {
			const playerIndex = PlayerId();
			const localSource = GetPlayerServerId(playerIndex);

			this.localPlayer = new NetPlayer(localSource);
		}

		return this.localPlayer;
	}

	static getBySource(source: number | string) {
		return new NetPlayer(source);
	}

	static getByScriptId(id: number) {
		const playerIndex = NetworkGetPlayerIndexFromPed(id);
		const targetSource = GetPlayerServerId(playerIndex);

		return new NetPlayer(targetSource);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);
		const playerIndex = NetworkGetPlayerIndexFromPed(entity);
		const targetSource = GetPlayerServerId(playerIndex);

		return new NetPlayer(targetSource);
	}

	private _source: number | string;

	protected _stateBag: StateBagInterface;

	constructor(source: number | string) {
		super();

		this._source = source;

		this._stateBag = Player(this._source).state;
	}

	get isLocalPlayer() {
		return PlayerId() === this.playerIndex;
	}

	get scriptID(): number {
		return GetPlayerPed(this.playerIndex);
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
