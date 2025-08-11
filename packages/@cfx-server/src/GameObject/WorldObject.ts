import { Vector3 } from '@aquiver-cfx/shared';
import { BaseObject } from './BaseObject';
import { StreamingGroup } from './StreamingGroup';

export abstract class WorldObject extends BaseObject {
	protected static override entities = new Map<number, WorldObject>();

	private readonly _streamingGroup: StreamingGroup;

	private readonly _streamingDistance: number;

	constructor(
		position: Vector3,
		dimension: number,
		streamingGroup: StreamingGroup,
		streamingDistance: number,
		replicated: boolean = false
	) {
		super(replicated);

		this._streamingGroup = streamingGroup;
		this._streamingDistance = streamingDistance;

		this._streamingGroup.addPool(this);

		WorldObject.entities.set(this.id, this);
	}

	distanceTo(position: Vector3 | WorldObject): number {
		if (position instanceof Vector3) {
			return this.position.distanceTo(position);
		} else {
			return position.distanceTo(position.position);
		}
	}

	isNearTo(position: Vector3, distance: number): boolean {
		return this.distanceTo(position) <= distance;
	}

	get streamingDistance() {
		return this._streamingDistance;
	}

	get streamingGroup() {
		return this._streamingGroup;
	}

	get position() {
		return new Vector3();
	}

	get dimension() {
		return 0;
	}

	set dimension(dimension: number) {
		// this.emitToTargets('WorldObject:SetDimension', this.id, dimension);
	}

	set position(pos: Vector3) {
		// this.emitToTargets('WorldObject:SetPosition', this.id, pos);
	}

	get streamedIn() {
		return this._streamingGroup.getPlayersStreamingThisObject(this);
	}

	cbStreamedEntities(func: (targetSource: number) => void) {
		const streamedIn = this.streamedIn;

		for (const source of streamedIn) {
			func(Number(source));
		}
	}

	destroy() {
		super.destroy();

		this._streamingGroup.removePool(this);

		WorldObject.entities.delete(this.id);
	}
}
