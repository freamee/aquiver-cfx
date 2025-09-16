import { Blip } from './Blip';
export class PointBlip extends Blip {
    constructor(position) {
        super(AddBlipForCoord(position.x, position.y, position.z));
    }
}
