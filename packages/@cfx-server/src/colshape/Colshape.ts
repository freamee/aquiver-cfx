import { Vector3 } from '@aquiver-cfx/shared';
import { StreamingGroup, WorldObject } from '../GameObject';
import { NetEntity } from '../Entity';
import { NetPlayer } from '../Entity/Player/NetPlayer';

export abstract class Colshape extends WorldObject {
	protected static override entities = new Map<number, Colshape>();

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
		return this.playersInCache.has(player.source);
	}

	onEnter(player: NetPlayer) {
		emit('enterColshape', this.id, player.source);

		this.playersInCache.add(player.source);
	}

	onLeave(player: NetPlayer) {
		emit('leaveColshape', this, player);

		this.playersInCache.delete(player.source);
	}

	destroy(): void {
		// for (const id of [...this.playersInCache]) {
		// 	const player = NetPlayer.get(id);
		// 	if (player) {
		// 		this.onLeave(player);
		// 	}
		// }

		// this.playersInCache.clear();

		super.destroy();

		Colshape.entities.delete(this.id);
	}
}
