import { Colshape } from './Colshape';
import { NetEntity, Vector3 } from '..';

export class CircleColshape extends Colshape {
	protected static override entities = new Map<number, CircleColshape>();

	static override get all() {
		return Array.from(this.entities.values());
	}

	private _radius: number = 0;

	constructor(position: Vector3, dimension: number, radius: number, global: boolean = true) {
		super('CircleColshape', position, dimension, global);

		this._radius = radius;

		CircleColshape.entities.set(this.id, this);
	}

	get type(): string {
		return 'CircleColshape';
	}

	get radius() {
		return this._radius;
	}

	set radius(radius: number) {
		this._radius = radius;
	}

	isPointIn(position: Vector3): boolean {
		return this.position.distanceTo(position) <= this._radius;
	}

	isEntityIn(entity: NetEntity): boolean {
		return this.isPointIn(entity.position);
	}

	destroy(): void {
		super.destroy();

		CircleColshape.entities.delete(this.id);
	}
}
