import { StreamingGroup } from '../StreamingGroup';
import { WorldObject } from '@/WorldObject';
import { NetEntity, NetPlayer } from '..';
import { Vector3 } from 'three';

export abstract class Colshape extends WorldObject {
	protected static override entities = new Map<number, Colshape>();

	static override get(id: number) {
		return this.entities.get(id);
	}

	static override get all() {
		return Array.from(this.entities.values());
	}

	static readonly streamingGroup = new StreamingGroup(64);

	abstract isPointIn(position: Vector3): boolean;

	abstract isEntityIn(entity: NetEntity): boolean;

	private playersInCache = new Set<number>();

	protected _colshapeType: string;

	constructor(
		colshapeType: string,
		position: Vector3,
		dimension: number = 0,
		global: boolean = true
	) {
		super(global);

		this._colshapeType = colshapeType;

		Colshape.entities.set(this.id, this);
	}

	isPlayerInCache(player: NetPlayer) {
		return this.playersInCache.has(player.id);
	}

	onEnter(player: NetPlayer) {
		emit('enterColshape', this, player);

		this.playersInCache.add(player.id);
	}

	onLeave(player: NetPlayer) {
		emit('leaveColshape', this, player);

		this.playersInCache.delete(player.id);
	}

	destroy(): void {
		for (const id of [...this.playersInCache]) {
			const player = NetPlayer.get(id);
			if (player) {
				this.onLeave(player);
			}
		}

		this.playersInCache.clear();

		super.destroy();

		Colshape.entities.delete(this.id);
	}
}
