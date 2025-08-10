import { Interval } from '@aquiver-cfx/shared';
import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { BlipsManager } from './Blip/BlipsManager';
import { Label, LabelRenderer, LabelsManager } from './Label';
import { Marker, MarkerRenderer, MarkersManager } from './Marker';
import { StreamingGroup } from './GameObject';
import { meta } from './Meta/Meta';
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
    getMetaEntries = meta.fromEntries.bind(meta);
    getMeta = meta.get.bind(meta);
    setMeta = meta.set.bind(meta);
    deleteMeta = meta.delete.bind(meta);
    hasMeta = meta.has.bind(meta);
    constructor() {
        this.markers = new MarkersManager();
        this.labels = new LabelsManager();
        this.blips = new BlipsManager();
        new MarkerRenderer();
        new LabelRenderer();
        new Interval(() => {
            for (const group of StreamingGroup.all) {
                group.update();
            }
        }, 1000, true, false);
    }
}
