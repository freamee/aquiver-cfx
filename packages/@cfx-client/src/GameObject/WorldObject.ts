import { Vector3 } from '@aquiver-cfx/shared';
import { BaseObject } from './BaseObject';

export abstract class WorldObject extends BaseObject {
	private _position: Vector3;
	private _dimension: number;

	protected constructor(position: Vector3) {
		super();

		this._position = position;
		this._dimension = 0;
	}

	distanceTo(position: Vector3): number {
		return this.position.distanceTo(position);
	}

	isNearTo(position: Vector3, distance: number): boolean {
		return this.distanceTo(position) <= distance;
	}

	get streamingDistance() {
		return -1;
	}

	get dimension() {
		return this._dimension;
	}

	set dimension(value: number) {
		const oldValue = this._dimension;

		this._dimension = value;

		if (oldValue !== value) {
			emit('dimensionChange', this.id, value, oldValue);
		}
	}

	get position() {
		return this._position;
	}

	set position(pos: Vector3) {
		this._position = pos;
	}
}
