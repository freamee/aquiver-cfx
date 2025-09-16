import { Vector3 } from '@aquiver-cfx/shared';
import { BaseObject } from './BaseObject';

export abstract class WorldObject extends BaseObject {
	constructor() {
		super();
	}

	distanceTo(position: Vector3 | WorldObject): number {
		if (position instanceof Vector3) {
			return this.position.distanceTo(position);
		} else {
			return position.distanceTo(position.position);
		}
	}

	isNearTo(position: Vector3, distance: number): boolean {
		return this.distanceTo(position) <= distance;
	}

	abstract get position(): Vector3;
	abstract set position(pos: Vector3);
}
