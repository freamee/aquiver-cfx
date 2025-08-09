import { Vector3 } from 'three';
import { Blip } from './Blip';

export class PointBlip extends Blip {
	protected static override entities = new Map<number, PointBlip>();

	static override get(id: number) {
		return this.entities.get(id);
	}

	constructor(position: Vector3, dimension: number = 0, global: boolean = true) {
		super('PointBlip', position, dimension, global);

		PointBlip.entities.set(this.id, this);
	}

	destroy(): void {
		super.destroy();

		PointBlip.entities.delete(this.id);
	}
}
