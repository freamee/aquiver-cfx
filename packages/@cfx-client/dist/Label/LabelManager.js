import { Label } from './Label';
export class LabelsManager {
    new(text, position, color, useStreaming, streamingDistance) {
        const entity = new Label(text, position, color, useStreaming, streamingDistance);
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
