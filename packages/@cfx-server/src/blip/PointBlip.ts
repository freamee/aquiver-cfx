import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class PointBlip extends Blip {
	protected static override entities = new Map<number, PointBlip>();

	constructor(position: Vector3, dimension: number = 0, global: boolean = true) {
		super('PointBlip', position, dimension, global);

		PointBlip.entities.set(this.id, this);
	}

	destroy(): void {
		super.destroy();

		PointBlip.entities.delete(this.id);
	}
}
