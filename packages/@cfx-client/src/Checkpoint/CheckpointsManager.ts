import { Vector3 } from '@aquiver-cfx/shared';
import { Checkpoint } from './Checkpoint';

export class CheckpointsManager {
	new(...args: ConstructorParameters<typeof Checkpoint>) {
		const entity = new Checkpoint(...args);

		return entity;
	}

	at(id: number) {
		return Checkpoint.getById(id);
	}

	get all() {
		return Checkpoint.all;
	}

	destroyAll() {
		Checkpoint.all.forEach((i) => i.destroy());
	}

	findInRange(position: Vector3, range: number) {
		return Checkpoint.all.filter((i) => i.position.distanceTo(position) <= range);
	}
}
