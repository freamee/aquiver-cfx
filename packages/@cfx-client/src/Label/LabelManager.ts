import { RGBA, Vector3 } from '@aquiver-cfx/shared';
import { Label } from './Label';

export class LabelsManager {
	new(
		text: string,
		position: Vector3,
		color?: RGBA,
		useStreaming?: boolean,
		streamingDistance?: number
	) {
		const entity = new Label(text, position, color, useStreaming, streamingDistance);

		return entity;
	}

	at(id: number) {
		return Label.getById(id);
	}

	get all() {
		return Label.all;
	}

	get streamed() {
		return Label.all.filter((i) => i.isStreamed);
	}

	destroyAll() {
		Label.all.forEach((i) => i.destroy());
	}

	findInRange(position: Vector3, range: number) {
		return Label.all.filter((i) => i.position.distanceTo(position) <= range);
	}
}
