import { Blip } from './Blip';
export class BlipsManager {
    // new(
    // 	text: string,
    // 	position: Vector3,
    // 	color?: RGBA,
    // 	useStreaming?: boolean,
    // 	streamingDistance?: number
    // ) {
    // 	const entity = new Label(text, position, color, useStreaming, streamingDistance);
    // 	return entity;
    // }
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
