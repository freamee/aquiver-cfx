import { WorldObject } from '../WorldObject';
import { NetPlayer } from '@/NetPlayer';
export class Colshape extends WorldObject {
    static entities = new Map();
    static get all() {
        return [...this.entities.values()];
    }
    constructor(position) {
        super(position);
        Colshape.entities.set(this.id, this);
    }
    onEnter() {
        // EventManager.emit('enterColshape', this);
        //
        // if (this.isRemote) {
        // 	emitNet('enterColshape', this.remoteID);
        // }
    }
    onLeave() {
        // 		EventManager.emit('leaveColshape', this);
        //
        // 		if (this.isRemote) {
        // 			emitNet('leaveColshape', this.remoteID);
        // 		}
    }
    destroy() {
        if (lastColshapes.has(this.id)) {
            lastColshapes.delete(this.id);
            this.onLeave();
        }
        super.destroy();
        Colshape.entities.delete(this.id);
    }
}
const lastColshapes = new Set();
setInterval(() => {
    const local = NetPlayer.local;
    const currentStreamedIds = new Set();
    // for (const entity of Colshape.streamedIn) {
    // 	currentStreamedIds.add(entity.id);
    // 	const isInside = entity.isEntityIn(local);
    // 	if (isInside && !lastColshapes.has(entity.id)) {
    // 		lastColshapes.add(entity.id);
    // 		entity.onEnter();
    // 	}
    // 	if (!isInside && lastColshapes.has(entity.id)) {
    // 		lastColshapes.delete(entity.id);
    // 		entity.onLeave();
    // 	}
    // }
    // for (const id of lastColshapes) {
    // 	if (!currentStreamedIds.has(id)) {
    // 		const entity = Colshape.all.find((e) => e.id === id);
    // 		if (entity) {
    // 			entity.onLeave();
    // 		}
    // 		lastColshapes.delete(id);
    // 	}
    // }
}, 500);
