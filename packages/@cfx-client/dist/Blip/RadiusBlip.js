import { Blip } from './Blip';
export class RadiusBlip extends Blip {
    constructor(position, radius) {
        super(AddBlipForRadius(position.x, position.y, position.z, radius));
    }
}
