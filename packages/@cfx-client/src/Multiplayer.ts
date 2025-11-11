import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { LocalPed, LocalProp, LocalVehicle } from './Entity';

export class MultiplayerManager {
	private readonly _resourceName: string = GetCurrentResourceName();

	public readonly Blip = Blip;
	public readonly PointBlip = PointBlip;
	public readonly AreaBlip = AreaBlip;
	public readonly RadiusBlip = RadiusBlip;

	constructor() {
		on('onResourceStop', this.onResourceStop.bind(this));
		on('onResourceStart', this.onResourceStart.bind(this));
	}

	private onResourceStart(resourceName: string) {
		if (this._resourceName !== resourceName) return;
	}

	private onResourceStop(resourceName: string) {
		if (this._resourceName !== resourceName) return;

		const entities = [...LocalProp.all, ...LocalPed.all, ...LocalVehicle.all];

		for (const entity of entities) {
			entity.destroy();
		}

		console.log(`Destroyed ${entities.length} entity.`);
	}
}
