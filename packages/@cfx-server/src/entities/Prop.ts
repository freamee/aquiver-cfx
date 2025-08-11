import { Vector3 } from '@aquiver-cfx/shared';
import { StreamingGroup, VirtualEntity } from '../GameObject';

export class Prop extends VirtualEntity {
	private static group = new StreamingGroup(128);

	constructor(
		modelHash: string | number,
		position: Vector3,
		dimension: number = 0,
		rotation: Vector3 = new Vector3(),
		streamingDistance: number = 256
	) {
		super(position, dimension, Prop.group, streamingDistance);

		this.streamMeta.set('PROP_MODEL_HASH', modelHash);
		this.streamMeta.set('PROP_ROTATION', rotation);
	}

	get modelHash() {
		return this.streamMeta.get<string | number>('PROP_MODEL_HASH');
	}

	set modelHash(value: string | number) {
		this.streamMeta.set('PROP_MODEL_HASH', value);
	}

	get rotation() {
		return this.streamMeta.get<Vector3>('PROP_ROTATION');
	}

	set rotation(value: Vector3) {
		this.streamMeta.set('PROP_ROTATION', value);
	}
}
