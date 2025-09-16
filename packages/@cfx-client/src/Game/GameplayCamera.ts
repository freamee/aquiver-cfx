import { Vector3 } from '@aquiver-cfx/shared';

export abstract class GameplayCamera {
	static get position(): Vector3 {
		const [x, y, z] = GetGameplayCamCoord();

		return new Vector3(x, y, z);
	}

	static get rotation(): Vector3 {
		const [x, y, z] = GetGameplayCamRot(2);

		return new Vector3(x, y, z);
	}

	static get relativePitch(): number {
		return GetGameplayCamRelativePitch();
	}

	static set relativePitch(pitch: number) {
		SetGameplayCamRelativePitch(pitch, 1);
	}

	static get relativeHeading(): number {
		return GetGameplayCamRelativeHeading();
	}

	static set relativeHeading(heading: number) {
		SetGameplayCamRelativeHeading(heading);
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
