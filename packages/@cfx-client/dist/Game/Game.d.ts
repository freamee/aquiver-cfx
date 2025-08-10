import { Vector3 } from 'three';
export declare abstract class Game {
    static hash(input: string): number;
    static get language(): number;
    static get gameTime(): number;
    static get frameCount(): number;
    static get FPS(): number;
    static get lastFrameTime(): number;
    static getOffsetFromCoordAndHeadingInWorldCoords(position: Vector3, heading: number, offset: Vector3): Vector3;
}
