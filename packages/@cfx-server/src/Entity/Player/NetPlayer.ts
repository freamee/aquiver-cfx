import { NetEntity } from '../NetEntity';
import { NetVehicle } from '../Vehicle';

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

	get vehicle() {
		const id = GetVehiclePedIsIn(this.scriptID, false);

		return NetVehicle.getByScriptId(id);
	}

	get lastVehicle() {
		const id = GetVehiclePedIsIn(this.scriptID, true);

		return NetVehicle.getByScriptId(id);
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

	set controlsEnabled(state: boolean) {
		SetPlayerControl(this.playerSrc, state, 0);
	}

	withTimeout(cb: Function, duration: number) {
		const timeout = setTimeout(() => {
			try {
				cb();
			} catch (error) {
				console.error(error);
			}
		}, duration);

		return () => clearTimeout(timeout);
	}

	beginAction(): boolean {
		if (this.meta.has('actionState')) {
			return false;
		}

		this.meta.set('actionState', true);

		return true;
	}

	endAction(): void {
		this.meta.delete('actionState');
	}

	destroy(): void {
		super.destroy();

		NetPlayer._entities.delete(this.source);
	}
}
