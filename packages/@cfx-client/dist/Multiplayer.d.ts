import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { BlipsManager } from './Blip/BlipsManager';
import { Label, LabelsManager } from './Label';
import { Marker, MarkersManager } from './Marker';
export declare class MultiplayerManager {
    readonly markers: MarkersManager;
    readonly Marker: typeof Marker;
    readonly labels: LabelsManager;
    readonly TextLabel: typeof Label;
    readonly blips: BlipsManager;
    readonly Blip: typeof Blip;
    readonly PointBlip: typeof PointBlip;
    readonly AreaBlip: typeof AreaBlip;
    readonly RadiusBlip: typeof RadiusBlip;
    constructor();
}
