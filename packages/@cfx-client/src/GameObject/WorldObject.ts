import { Vector3 } from '@aquiver-cfx/shared';
import { BaseObject } from './BaseObject';

export abstract class WorldObject extends BaseObject {
	protected static override entities = new Map<number, WorldObject>();

	static override getByID(id: number) {
		return this.entities.get(id);
	}

	static override get all() {
		return Array.from(this.entities.values());
	}

	static override get count() {
		return this.entities.size;
	}

	private _position: Vector3;

	constructor(position: Vector3) {
		super();

		this._position = position;

		WorldObject.entities.set(this.id, this);
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

	get position() {
		return this._position;
	}

	set position(pos: Vector3) {
		this._position = pos;
	}

	destroy() {
		super.destroy();

		WorldObject.entities.delete(this.id);
	}
}
