import { CircleColshape } from '../Colshape/CircleColshape';
import { RGBA, Vector3 } from '@aquiver-cfx/shared';
interface iOptions {
    destination: Vector3;
    color: RGBA;
}
export declare class Checkpoint extends CircleColshape {
    protected static entities: Map<number, Checkpoint>;
    static getByID(id: number): Checkpoint | undefined;
    private static getInitialOptions;
    private _checkpointType;
    private _destination;
    private _color;
    protected _scriptID: number;
    constructor(type: number, position: Vector3, radius: number, options?: Partial<iOptions>);
    get scriptID(): number;
    get checkpointType(): number;
    get destination(): Vector3;
    set destination(position: Vector3);
    get color(): RGBA;
    set color(color: RGBA);
    destroy(): void;
}
export {};
