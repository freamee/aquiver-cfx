import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
export declare class MultiplayerManager {
    private readonly _resourceName;
    readonly Blip: typeof Blip;
    readonly PointBlip: typeof PointBlip;
    readonly AreaBlip: typeof AreaBlip;
    readonly RadiusBlip: typeof RadiusBlip;
    constructor();
    private onResourceStart;
    private onResourceStop;
}
