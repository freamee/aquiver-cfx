import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';
import { RadiusBlip } from './RadiusBlip';
import { PointBlip } from './PointBlip';
import { AreaBlip } from './AreaBlip';

export class BlipsManager {
	newPoint(...args: Parameters<(typeof PointBlip)['create']>) {
		return PointBlip.create(...args);
	}

	newArea(...args: Parameters<(typeof AreaBlip)['create']>) {
		return AreaBlip.create(...args);
	}

	newRadius(...args: Parameters<(typeof RadiusBlip)['create']>) {
		return RadiusBlip.create(...args);
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
