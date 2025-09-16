import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class PointBlip extends Blip {
	constructor(position: Vector3) {
		super(AddBlipForCoord(position.x, position.y, position.z));
	}
}
