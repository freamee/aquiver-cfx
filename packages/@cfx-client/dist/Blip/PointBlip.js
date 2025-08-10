import { Blip } from './Blip';
export class PointBlip extends Blip {
    static create(position) {
        const id = AddBlipForCoord(position.x, position.y, position.z);
        const entity = new PointBlip(id);
        return entity;
    }
    constructor(id) {
        super(id);
    }
}
