import { Vector3 } from '@aquiver-cfx/shared';
export class GameplayCamera {
    static get position() {
        const [x, y, z] = GetGameplayCamCoord();
        return new Vector3(x, y, z);
    }
    static get rotation() {
        const [x, y, z] = GetGameplayCamRot(2);
        return new Vector3(x, y, z);
    }
    static get relativePitch() {
        return GetGameplayCamRelativePitch();
    }
    static set relativePitch(pitch) {
        SetGameplayCamRelativePitch(pitch, 1);
    }
    static get relativeHeading() {
        return GetGameplayCamRelativeHeading();
    }
    static set relativeHeading(heading) {
        SetGameplayCamRelativeHeading(heading);
    }
}
