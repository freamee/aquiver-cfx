import { NetPlayer } from '../Entity/Player/NetPlayer';
import { BaseObject } from './BaseObject';
import { WorldObject } from './WorldObject';

export class StreamingGroup extends BaseObject {
	protected static override entities = new Map<number, StreamingGroup>();

	static override get all() {
		return Array.from(this.entities.values());
	}

	private _maxEntitiesInStream: number;

	private _entities = new Map<number, WorldObject>();

	private _streamedEntities = new Map<number, Set<WorldObject>>();

	constructor(maxEntitiesInStream: number) {
		super(false);

		this._maxEntitiesInStream = maxEntitiesInStream;

		StreamingGroup.entities.set(this.id, this);
	}

	get type(): string {
		return 'StreamingGroup';
	}

	addPool(worldObject: WorldObject) {
		this._entities.set(worldObject.id, worldObject);
	}

	removePool(worldObject: WorldObject) {
		this._entities.delete(worldObject.id);

		this._streamedEntities.forEach((set) => set.delete(worldObject));
	}

	getPlayersStreamingThisObject(worldObject: WorldObject) {
		const sources: number[] = [];

		for (const [playerSource, entities] of this._streamedEntities) {
			if (entities.has(worldObject)) {
				sources.push(playerSource);
			}
		}

		return sources;
	}

	get entities() {
		return this._entities;
	}

	get maxEntitiesInStream() {
		return this._maxEntitiesInStream;
	}

	update(player: NetPlayer) {
		const pos = player.position;
		const dimension = player.dimension;
		const playerSource = player.source;

		if (!this._streamedEntities.has(playerSource)) {
			this._streamedEntities.set(playerSource, new Set());
		}

		const streamedSet = this._streamedEntities.get(playerSource)!;

		const nearbyEntities = [...this._entities.values()].filter((entity) => {
			return (
				entity.position.distanceTo(pos) <= entity.streamingDistance &&
				entity.dimension === dimension
			);
		});

		const sortedEntities = nearbyEntities.sort((a, b) => {
			return a.position.distanceTo(pos) - b.position.distanceTo(pos);
		});

		const toStreamIn = sortedEntities.slice(0, this._maxEntitiesInStream);

		const toStreamOut = [...streamedSet.values()].filter(
			(ent) => !toStreamIn.some((entity) => entity === ent)
		);

		for (const entity of toStreamIn) {
			if (streamedSet.has(entity)) continue;

			streamedSet.add(entity);

			// entity.streamIn(player)
		}

		for (const entity of toStreamOut) {
			streamedSet.delete(entity);

			// entity.streamOut(player)
		}
	}

	destroy(): void {
		super.destroy();

		StreamingGroup.entities.delete(this.id);

		this._streamedEntities.clear();
	}
}
