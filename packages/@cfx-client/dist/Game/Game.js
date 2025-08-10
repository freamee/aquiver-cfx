import { Vector3 } from '@aquiver-cfx/shared';
export class Game {
    static hash(input) {
        return GetHashKey(input);
    }
    static get language() {
        return GetUiLanguageId();
    }
    static get gameTime() {
        return GetGameTimer();
    }
    static get frameCount() {
        return GetFrameCount();
    }
    static get FPS() {
        return 1 / this.lastFrameTime;
    }
    static get lastFrameTime() {
        return GetFrameTime();
    }
    static getOffsetFromCoordAndHeadingInWorldCoords(position, heading, offset) {
        const [x, y, z] = GetOffsetFromCoordAndHeadingInWorldCoords(position.x, position.y, position.z, heading, offset.x, offset.y, offset.z);
        return new Vector3(x, y, z);
    }
}
