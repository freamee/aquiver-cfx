import { Blip } from './Blip';
import { RadiusBlip } from './RadiusBlip';
import { PointBlip } from './PointBlip';
import { AreaBlip } from './AreaBlip';
export class BlipsManager {
    newPoint(position) {
        return new PointBlip(position);
    }
    newArea(position, width, height) {
        return new AreaBlip(position, width, height);
    }
    newRadius(position, radius) {
        return new RadiusBlip(position, radius);
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
