import { Vector3 } from '@aquiver-cfx/shared';
import { WorldObject } from '../GameObject';
export declare abstract class Blip extends WorldObject {
    private _scriptID;
    protected constructor(id: number);
    get scriptID(): number;
    get isValid(): boolean;
    set name(name: string);
    get position(): Vector3;
    set position(pos: Vector3);
    set rotation(rot: number);
    get rotation(): number;
    get alpha(): number;
    set alpha(alpha: number);
    get color(): number;
    set color(color: number);
    get sprite(): number;
    set sprite(sprite: number);
    set scale(scale: number);
    set display(display: number);
    set category(category: number);
    get isFlashing(): boolean;
    set isFlashing(flashing: boolean);
    get isShortRange(): boolean;
    set isShortRange(shortRange: boolean);
    set isRoute(state: boolean);
    set routeColor(color: number);
    destroy(): void;
}
