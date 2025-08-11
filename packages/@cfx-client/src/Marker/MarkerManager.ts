import { Vector3 } from '@aquiver-cfx/shared';
import { Marker } from './Marker';

export class MarkersManager {
	new(...args: ConstructorParameters<typeof Marker>) {
		const marker = new Marker(...args);

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
