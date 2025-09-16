import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
export declare class MultiplayerManager {
    readonly Blip: typeof Blip;
    readonly PointBlip: typeof PointBlip;
    readonly AreaBlip: typeof AreaBlip;
    readonly RadiusBlip: typeof RadiusBlip;
    getMetaEntries: () => {
        [k: string]: any;
    };
    getMeta: <T = unknown>(key: string) => T;
    setMeta: <T = unknown>(key: string, value: T) => void;
    deleteMeta: (key: string) => boolean;
    hasMeta: (key: string) => boolean;
    constructor();
    private onResourceStart;
    private onResourceStop;
}
