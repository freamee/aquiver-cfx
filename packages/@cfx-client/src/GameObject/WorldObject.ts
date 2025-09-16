import { Vector3 } from '@aquiver-cfx/shared';
import { BaseObject } from './BaseObject';

export abstract class WorldObject extends BaseObject {
	protected constructor() {
		super();
	}

	distanceTo(position: Vector3): number {
		return this.position.distanceTo(position);
	}

	isNearTo(position: Vector3, distance: number): boolean {
		return this.distanceTo(position) <= distance;
	}

	abstract get position(): Vector3;
	abstract set position(pos: Vector3);
}
