import { Marker } from './Marker';
export class MarkersManager {
    new(...args) {
        const marker = new Marker(...args);
        return marker;
    }
    at(id) {
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
    findInRange(position, range) {
        return Marker.all.filter((marker) => marker.position.distanceTo(position) <= range);
    }
}
