import { Blip } from './Blip';
import { RadiusBlip } from './RadiusBlip';
import { PointBlip } from './PointBlip';
import { AreaBlip } from './AreaBlip';
export class BlipsManager {
    newPoint(...args) {
        return PointBlip.create(...args);
    }
    newArea(...args) {
        return AreaBlip.create(...args);
    }
    newRadius(...args) {
        return RadiusBlip.create(...args);
    }
    at(id) {
        return Blip.getById(id);
    }
    get all() {
        return Blip.all;
    }
    destroyAll() {
        Blip.all.forEach((i) => i.destroy());
    }
    findInRange(position, range) {
        return Blip.all.filter((i) => i.position.distanceTo(position) <= range);
    }
}
