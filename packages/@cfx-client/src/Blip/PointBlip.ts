import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class PointBlip extends Blip {
	constructor(position: Vector3, remoteId: number = -1) {
		super(position, remoteId);
	}

	protected createBlip(): number {
		return AddBlipForCoord(this.position.x, this.position.y, this.position.z);
	}
}
