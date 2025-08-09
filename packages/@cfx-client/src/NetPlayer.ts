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
