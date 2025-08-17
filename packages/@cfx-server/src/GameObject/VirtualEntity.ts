import { Meta, Vector3 } from '@aquiver-cfx/shared';
import { StreamingGroup } from './StreamingGroup';
import { WorldObject } from './WorldObject';

class StreamMeta extends Meta {
	constructor(private entity: VirtualEntity) {
		super();
	}

	protected onSet(key: string, value: any, oldValue: any): void {
		this.entity.cbStreamedEntities((targetSource) => {
			emitNet('StreamingEntity:StreamMeta:Update', targetSource, this.entity.id, key, value);
		});
	}

	protected onDelete(key: string, oldValue: any): void {
		this.entity.cbStreamedEntities((targetSource) => {
			emitNet('StreamingEntity:StreamMeta:Delete', targetSource, this.entity.id, key);
		});
	}

	protected onChange(key: string, value: any, oldValue: any): void {
		//
	}
}

export class VirtualEntity extends WorldObject {
	protected static override entities = new Map<number, VirtualEntity>();

	private _streamMeta: StreamMeta;

	constructor(
		position: Vector3,
		dimension: number,
		streamingGroup: StreamingGroup,
		streamingDistance: number,
		replicated: boolean = true
	) {
		super(position, dimension, streamingGroup, streamingDistance, replicated);

		this._streamMeta = new StreamMeta(this);

		VirtualEntity.entities.set(this.id, this);
	}

	get type(): string {
		return 'VirtualEntity';
	}

	get streamMeta() {
		return this._streamMeta;
	}

	destroy(): void {
		super.destroy();

		VirtualEntity.entities.delete(this.id);
	}
}
