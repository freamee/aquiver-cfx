import { Vector3 } from '@aquiver-cfx/shared';
export declare abstract class GameplayCamera {
    static get position(): Vector3;
    static get rotation(): Vector3;
    static get relativePitch(): number;
    static set relativePitch(pitch: number);
    static get relativeHeading(): number;
    static set relativeHeading(heading: number);
}
