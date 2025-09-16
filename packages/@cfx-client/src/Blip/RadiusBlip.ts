import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class RadiusBlip extends Blip {
	constructor(position: Vector3, radius: number) {
		super(AddBlipForRadius(position.x, position.y, position.z, radius));
	}
}
