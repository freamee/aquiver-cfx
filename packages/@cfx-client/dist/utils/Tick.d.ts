export declare class Tick {
    private _tick;
    private _callback;
    constructor(callback: () => void, immediate?: boolean);
    start(): void;
    stop(): void;
    isActive(): boolean;
    destroy(): void;
}
