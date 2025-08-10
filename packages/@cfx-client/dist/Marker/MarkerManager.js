import { Marker } from './Marker';
export class MarkersManager {
    new(type, position, color, useStreaming, streamingDistance) {
        const marker = new Marker(type, position, color, useStreaming, streamingDistance);
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
