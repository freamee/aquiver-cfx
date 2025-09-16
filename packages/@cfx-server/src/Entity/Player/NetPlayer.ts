import { NetEntity } from '../NetEntity';
import { NetVehicle } from '../Vehicle';

export class NetPlayer extends NetEntity {
	static getBySource(source: string | number) {
		return new NetPlayer(source);
	}

	static getByScriptId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return new NetPlayer(entity);
	}

	static getByNetId(id: number) {
		// const entity = NetworkGetEntityFromNetworkId(id)
		// return this.all.find((i) => i.networkID === id);
	}

	static getByBagname(bagName: string) {
		const id = GetPlayerFromStateBagName(bagName);

		return this.getByScriptId(id);
	}

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
		if (this.getStateBag<boolean>('actionState')) {
			return false;
		}

		this.setStateBag('actionState', true, false);

		return true;
	}

	endAction(): void {
		return this.setStateBag('actionState', false, false);
	}

	destroy(): void {}
}
