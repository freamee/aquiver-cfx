import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
import { RadiusBlip } from './RadiusBlip';
import { PointBlip } from './PointBlip';
import { AreaBlip } from './AreaBlip';

export class BlipsManager {
	newPoint(position: Vector3) {
		return new PointBlip(position);
	}

	newArea(position: Vector3, width: number, height: number) {
		return new AreaBlip(position, width, height);
	}

	newRadius(position: Vector3, radius: number) {
		return new RadiusBlip(position, radius);
	}

	at(id: number) {
		return Blip.getById(id);
	}

	get all() {
		return Blip.all;
	}

	destroyAll() {
		Blip.all.forEach((i) => i.destroy());
	}

	findInRange(position: Vector3, range: number) {
		return Blip.all.filter((i) => i.position.distanceTo(position) <= range);
	}
}
