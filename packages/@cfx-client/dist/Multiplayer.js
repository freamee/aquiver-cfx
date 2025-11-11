import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { LocalPed, LocalProp, LocalVehicle } from './Entity';
export class MultiplayerManager {
    _resourceName = GetCurrentResourceName();
    Blip = Blip;
    PointBlip = PointBlip;
    AreaBlip = AreaBlip;
    RadiusBlip = RadiusBlip;
    constructor() {
        on('onResourceStop', this.onResourceStop.bind(this));
        on('onResourceStart', this.onResourceStart.bind(this));
    }
    onResourceStart(resourceName) {
        if (this._resourceName !== resourceName)
            return;
    }
    onResourceStop(resourceName) {
        if (this._resourceName !== resourceName)
            return;
        const entities = [...LocalProp.all, ...LocalPed.all, ...LocalVehicle.all];
        for (const entity of entities) {
            entity.destroy();
        }
        console.log(`Destroyed ${entities.length} entity.`);
    }
}
