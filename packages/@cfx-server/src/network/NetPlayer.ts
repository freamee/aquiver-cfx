import { NetEntity } from './NetEntity';

export class NetPlayer extends NetEntity {
	private _source: string | number;

	protected _stateBag: StateBagInterface;

	constructor(source: string | number) {
		super();

		this._source = source;
		this._stateBag = Player(source).state;
	}

	get source() {
		return Number(this._source);
	}

	get playerSrc() {
		return String(this._source);
	}

	get scriptID(): number {
		return GetPlayerPed(this.playerSrc);
	}

	get dimension(): number {
		return GetPlayerRoutingBucket(this.playerSrc);
	}

	set dimension(dimension: number) {
		SetPlayerRoutingBucket(this.playerSrc, dimension);

		this.setStateBag('PLAYER_DIMENSION', dimension, true);
	}
}
