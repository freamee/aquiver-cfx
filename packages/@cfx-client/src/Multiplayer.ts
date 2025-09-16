import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { LocalPed, LocalProp, LocalVehicle } from './Entity';
import { meta } from './Meta/Meta';

export class MultiplayerManager {
	public readonly Blip = Blip;
	public readonly PointBlip = PointBlip;
	public readonly AreaBlip = AreaBlip;
	public readonly RadiusBlip = RadiusBlip;

	getMetaEntries = meta.fromEntries.bind(meta);
	getMeta = meta.get.bind(meta);
	setMeta = meta.set.bind(meta);
	deleteMeta = meta.delete.bind(meta);
	hasMeta = meta.has.bind(meta);

	constructor() {
		on('onResourceStop', this.onResourceStop.bind(this));
		on('onResourceStart', this.onResourceStart.bind(this));
	}

	private onResourceStart(resourceName: string) {
		if (GetCurrentResourceName() !== resourceName) return;
	}

	private onResourceStop(resourceName: string) {
		if (GetCurrentResourceName() !== resourceName) return;

		const entities = [...LocalProp.all, ...LocalPed.all, ...LocalVehicle.all];

		for (const entity of entities) {
			entity.destroy();
		}

		console.log(`Destroyed ${entities.length} entity.`);
	}
}
