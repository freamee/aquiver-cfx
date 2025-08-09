import { StreamingGroup } from '@/StreamingGroup';
import { VirtualEntity } from '@/VirtualEntity';
import { Vector3 } from 'three';

export class Ped extends VirtualEntity {
	private static group = new StreamingGroup(64);

	constructor(
		modelHash: string | number,
		position: Vector3,
		dimension: number = 0,
		heading: number = 0,
		streamingDistance: number = 256
	) {
		super(position, dimension, Ped.group, streamingDistance);

		this.streamMeta.set('PED_MODEL_HASH', modelHash);
		this.streamMeta.set('PED_HEADING', heading);
	}

	get modelHash() {
		return this.streamMeta.get<string | number>('PED_MODEL_HASH');
	}

	set modelHash(value: string | number) {
		this.streamMeta.set('PED_MODEL_HASH', value);
	}

	get heading() {
		return this.streamMeta.get<number>('PED_HEADING');
	}

	set heading(value: number) {
		this.streamMeta.set('PED_HEADING', value);
	}
}
