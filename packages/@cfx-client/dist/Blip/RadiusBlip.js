import { Blip } from './Blip';
export class RadiusBlip extends Blip {
    constructor(position, radius, remoteId = -1) {
        super(position, remoteId);
        super.scale = radius;
    }
    createBlip() {
        return AddBlipForRadius(this.position.x, this.position.y, this.position.z, this.scale);
    }
}
