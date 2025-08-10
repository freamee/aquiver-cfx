import { Vector3 } from 'three';
import { Marker } from './Marker';
import { RGBA } from '@aquiver-cfx/shared';

export class MarkersManager {
	new(
		type: number,
		position: Vector3,
		color?: RGBA,
		useStreaming?: boolean,
		streamingDistance?: number
	) {
		const marker = new Marker(type, position, color, useStreaming, streamingDistance);

		return marker;
	}

	at(id: number) {
		return Marker.getById(id);
	}

	get all() {
		return Marker.all;
	}

	get streamed() {
		return Marker.all.filter((marker) => marker.isStreamed);
	}

	destroyAll() {
		Marker.all.forEach((marker) => marker.destroy());
	}

	findInRange(position: Vector3, range: number) {
		return Marker.all.filter((marker) => marker.position.distanceTo(position) <= range);
	}
}
