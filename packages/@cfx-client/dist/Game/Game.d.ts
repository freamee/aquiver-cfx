import { Vector3 } from '@aquiver-cfx/shared';
export declare abstract class Game {
    static hash(input: string): number;
    static get language(): number;
    static get gameTime(): number;
    static get frameCount(): number;
    static get FPS(): number;
    static get lastFrameTime(): number;
    static getOffsetFromCoordAndHeadingInWorldCoords(position: Vector3, heading: number, offset: Vector3): Vector3;
}
