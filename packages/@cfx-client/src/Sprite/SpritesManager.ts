import { Vector3 } from '@aquiver-cfx/shared';
import { Sprite } from './Sprite';

export class SpritesManager {
	new(...args: ConstructorParameters<typeof Sprite>) {
		const entity = new Sprite(...args);

		return entity;
	}

	at(id: number) {
		return Sprite.getById(id);
	}

	get all() {
		return Sprite.all;
	}

	get streamed() {
		return Sprite.all.filter((entity) => entity.isStreamed);
	}

	destroyAll() {
		Sprite.all.forEach((entity) => entity.destroy());
	}

	findInRange(position: Vector3, range: number) {
		return Sprite.all.filter((entity) => entity.position.distanceTo(position) <= range);
	}
}
