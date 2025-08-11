import { Blip } from './Blip';
export class PointBlip extends Blip {
    constructor(position, remoteId = -1) {
        super(position, remoteId);
    }
    createBlip() {
        return AddBlipForCoord(this.position.x, this.position.y, this.position.z);
    }
}
