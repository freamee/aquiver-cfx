import { Label } from './Label';
export class LabelsManager {
    new(...args) {
        const entity = new Label(...args);
        return entity;
    }
    at(id) {
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
    findInRange(position, range) {
        return Label.all.filter((i) => i.position.distanceTo(position) <= range);
    }
}
