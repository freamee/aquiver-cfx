import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { BlipsManager } from './Blip/BlipsManager';
import { Label, LabelsManager } from './Label';
import { Marker, MarkersManager } from './Marker';
import { CheckpointsManager } from './Checkpoint/CheckpointsManager';
import { Checkpoint } from './Checkpoint/Checkpoint';
import { Sprite, SpritesManager } from './Sprite';
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
    readonly checkpoints: CheckpointsManager;
    readonly Checkpoint: typeof Checkpoint;
    readonly sprites: SpritesManager;
    readonly Sprite: typeof Sprite;
    getMetaEntries: () => {
        [k: string]: any;
    };
    getMeta: <T = unknown>(key: string) => T;
    setMeta: <T = unknown>(key: string, value: T) => void;
    deleteMeta: (key: string) => boolean;
    hasMeta: (key: string) => boolean;
    getSyncedMetaEntries: () => {
        [k: string]: any;
    };
    getSyncedMeta: <T = unknown>(key: string) => T;
    setSyncedMeta: <T = unknown>(key: string, value: T) => void;
    deleteSyncedMeta: (key: string) => boolean;
    hasSyncedMeta: (key: string) => boolean;
    constructor();
    private onResourceStart;
    private onResourceStop;
}
