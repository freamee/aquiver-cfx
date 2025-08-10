import { WorldObject } from '../GameObject';
import { type NetEntity, NetPlayer } from '../Entity';
import { Vector3 } from '@aquiver-cfx/shared';

export abstract class Colshape extends WorldObject {
	protected static override entities = new Map<number, Colshape>();

	static override get all() {
		return [...this.entities.values()];
	}

	static getById(id: number) {
		return this.entities.get(id);
	}

	abstract isPointIn(position: Vector3): boolean;

	abstract isEntityIn(entity: NetEntity): boolean;

	protected constructor(position: Vector3) {
		super(position);

		Colshape.entities.set(this.id, this);
	}

	onEnter() {
		emit('enterColshape', this.id);
	}

	onLeave() {
		emit('leaveColshape', this.id);
	}

	destroy(): void {
		if (lastColshapes.has(this.id)) {
			lastColshapes.delete(this.id);

			this.onLeave();
		}

		super.destroy();

		Colshape.entities.delete(this.id);
	}
}

const lastColshapes = new Set<number>();

setInterval(() => {
	const local = NetPlayer.local;

	const currentlyStreamed = new Set<number>();

	for (const entity of Colshape.all) {
		currentlyStreamed.add(entity.id);

		const isInside = entity.isEntityIn(local);

		if (isInside && !lastColshapes.has(entity.id)) {
			lastColshapes.add(entity.id);

			entity.onEnter();
		}

		if (!isInside && lastColshapes.has(entity.id)) {
			lastColshapes.delete(entity.id);
			entity.onLeave();
		}
	}

	for (const id of lastColshapes) {
		if (currentlyStreamed.has(id)) continue;

		const entity = Colshape.getById(id);

		if (entity) {
			entity.onLeave();
		}

		lastColshapes.delete(id);
	}
}, 500);
