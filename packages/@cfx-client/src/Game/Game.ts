import { Vector3 } from 'three';

export abstract class Game {
	static hash(input: string) {
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

	static get FPS(): number {
		return 1 / this.lastFrameTime;
	}

	static get lastFrameTime(): number {
		return GetFrameTime();
	}

	static getOffsetFromCoordAndHeadingInWorldCoords(
		position: Vector3,
		heading: number,
		offset: Vector3
	) {
		const [x, y, z] = GetOffsetFromCoordAndHeadingInWorldCoords(
			position.x,
			position.y,
			position.z,
			heading,
			offset.x,
			offset.y,
			offset.z
		);

		return new Vector3(x, y, z);
	}
}
