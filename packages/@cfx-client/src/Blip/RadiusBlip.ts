import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class RadiusBlip extends Blip {
	static create(position: Vector3, radius: number) {
		const id = AddBlipForRadius(position.x, position.y, position.z, radius);

		const entity = new RadiusBlip(id);

		return entity;
	}

	constructor(id: number) {
		super(id);
	}
}
