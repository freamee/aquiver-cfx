import { Colshape } from './Colshape';
export class CircleColshape extends Colshape {
    _radius = 0;
    constructor(position, radius) {
        super(position);
        this._radius = radius;
    }
    get radius() {
        return this._radius;
    }
    set radius(radius) {
        this._radius = radius;
    }
    isPointIn(position) {
        return this.position.distanceTo(position) <= this._radius;
    }
    isEntityIn(entity) {
        return this.isPointIn(entity.position);
    }
}
