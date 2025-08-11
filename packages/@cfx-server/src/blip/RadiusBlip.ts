import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class RadiusBlip extends Blip {
	protected static override entities = new Map<number, RadiusBlip>();

	constructor(position: Vector3, dimension: number, radius: number, global: boolean = true) {
		super('RadiusBlip', position, dimension, global);

		this.radius = radius;

		RadiusBlip.entities.set(this.id, this);
	}

	get radius() {
		return super.scale;
	}

	set radius(radius: number) {
		super.scale = radius;
	}

	destroy(): void {
		super.destroy();

		RadiusBlip.entities.delete(this.id);
	}
}
