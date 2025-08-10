import { Blip } from './Blip';
export class RadiusBlip extends Blip {
    static create(position, radius) {
        const id = AddBlipForRadius(position.x, position.y, position.z, radius);
        const entity = new RadiusBlip(id);
        return entity;
    }
    constructor(id) {
        super(id);
    }
}
