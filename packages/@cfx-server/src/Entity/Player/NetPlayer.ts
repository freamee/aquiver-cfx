import { NetEntity } from '../NetEntity';

export class NetPlayer extends NetEntity {
	private static _entities = new Map<number, NetPlayer>();

	static getBySource(source: string | number) {
		return this.all.find((i) => i.source === source);
	}

	static getByScriptId(id: number) {
		return this.all.find((i) => i.scriptID === id);
	}

	static getByNetId(id: number) {
		return this.all.find((i) => i.networkID === id);
	}

	static getById(id: number) {
		return this._entities.get(id);
	}

	static getByBagname(bagName: string) {
		const id = GetPlayerFromStateBagName(bagName);

		return this.getByScriptId(id);
	}

	static get all() {
		return [...this._entities.values()];
	}

	private _source: string | number;

	protected _stateBag: StateBagInterface;

	constructor(source: string | number) {
		super();

		this._source = source;
		this._stateBag = Player(source).state;

		NetPlayer._entities.set(this.source, this);
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

	destroy(): void {
		super.destroy();

		NetPlayer._entities.delete(this.source);
	}
}
