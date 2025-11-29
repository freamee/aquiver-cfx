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
    static get direction() {
        const rotation = this.rotation;
        const adjustedRotation = {
            x: (Math.PI / 180) * rotation.x,
            y: (Math.PI / 180) * rotation.y,
            z: (Math.PI / 180) * rotation.z
        };
        const direction = {
            x: -Math.sin(adjustedRotation.z) * Math.abs(Math.cos(adjustedRotation.x)),
            y: Math.cos(adjustedRotation.z) * Math.abs(Math.cos(adjustedRotation.x)),
            z: Math.sin(adjustedRotation.x)
        };
        return new Vector3(direction.x, direction.y, direction.z);
    }
    static get forwardVector() {
        const rot = this.rotation;
        const pitch = rot.x * (Math.PI / 180);
        const yaw = rot.z * (Math.PI / 180);
        const x = -Math.sin(yaw) * Math.cos(pitch);
        const y = Math.cos(yaw) * Math.cos(pitch);
        const z = Math.sin(pitch);
        return new Vector3(x, y, z);
    }
}
