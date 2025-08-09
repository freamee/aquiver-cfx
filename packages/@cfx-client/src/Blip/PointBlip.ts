import { Blip } from './Blip';
import { Vector3 } from 'three';

export class PointBlip extends Blip {
	static create(position: Vector3) {
		const id = AddBlipForCoord(position.x, position.y, position.z);

		const entity = new PointBlip(id);

		return entity;
	}

	constructor(id: number) {
		super(id);
	}
}
