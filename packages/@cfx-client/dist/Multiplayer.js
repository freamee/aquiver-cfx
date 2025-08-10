import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { BlipsManager } from './Blip/BlipsManager';
import { Label, LabelRenderer, LabelsManager } from './Label';
import { Marker, MarkerRenderer, MarkersManager } from './Marker';
export class MultiplayerManager {
    markers;
    Marker = Marker;
    labels;
    TextLabel = Label;
    blips;
    Blip = Blip;
    PointBlip = PointBlip;
    AreaBlip = AreaBlip;
    RadiusBlip = RadiusBlip;
    constructor() {
        this.markers = new MarkersManager();
        this.labels = new LabelsManager();
        this.blips = new BlipsManager();
        new MarkerRenderer();
        new LabelRenderer();
    }
}
