import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class RadiusBlip extends Blip {
	constructor(position: Vector3, radius: number, remoteId: number = -1) {
		super(position, remoteId);

		super.scale = radius;
	}

	protected createBlip(): number {
		return AddBlipForRadius(this.position.x, this.position.y, this.position.z, this.scale);
	}
}
