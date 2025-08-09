import { NetEntity } from '@/NetEntity';
import { Colshape } from './Colshape';
import { Vector3 } from 'three';

export class CircleColshape extends Colshape {
	private _radius: number = 0;

	constructor(position: Vector3, radius: number) {
		super(position);

		this._radius = radius;
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
}
