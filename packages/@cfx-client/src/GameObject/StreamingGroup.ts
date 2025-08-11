import { Vector3 } from '@aquiver-cfx/shared';
import { BaseObject } from './BaseObject';
import type { WorldObject } from './WorldObject';

export class StreamingGroup extends BaseObject {
	protected static override entities = new Map<number, StreamingGroup>();

	static override get all() {
		return [...this.entities.values()];
	}

	private _maxEntitiesInStream: number;

	private _entities = new Map<number, WorldObject>();

	private _streamedEntities = new Set<WorldObject>();

	constructor(maxEntitiesInStream: number) {
		super();

		this._maxEntitiesInStream = maxEntitiesInStream;

		StreamingGroup.entities.set(this.id, this);
	}

	addPool(worldObject: WorldObject) {
		this._entities.set(worldObject.id, worldObject);
	}

	removePool(worldObject: WorldObject) {
		this._entities.delete(worldObject.id);

		this._streamedEntities.delete(worldObject);
	}

	isStreamedIn(worldObject: WorldObject) {
		return this._streamedEntities.has(worldObject);
	}

	get entities() {
		return this._entities;
	}

	get maxEntitiesInStream() {
		return this._maxEntitiesInStream;
	}

	update(position: Vector3, dimension: number) {
		const streamedSet = this._streamedEntities;

		const nearbyEntities = [...this._entities.values()].filter((entity) => {
			return (
				entity.position.distanceTo(position) <= entity.streamingDistance &&
				entity.dimension === dimension
			);
		});

		const sortedEntities = nearbyEntities.sort((a, b) => {
			return a.position.distanceTo(position) - b.position.distanceTo(position);
		});

		const toStreamIn = sortedEntities.slice(0, this._maxEntitiesInStream);

		const toStreamOut = [...streamedSet.values()].filter(
			(ent) => !toStreamIn.some((entity) => entity === ent)
		);

		for (const entity of toStreamIn) {
			if (streamedSet.has(entity)) continue;

			streamedSet.add(entity);
		}

		for (const entity of toStreamOut) {
			streamedSet.delete(entity);
		}
	}

	destroy(): void {
		super.destroy();

		StreamingGroup.entities.delete(this.id);

		this._streamedEntities.clear();
	}
}
