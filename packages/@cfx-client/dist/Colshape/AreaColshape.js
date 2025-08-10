import { Colshape } from './Colshape';
export class AreaColshape extends Colshape {
    _width = 0;
    _height = 0;
    _rotation = 0;
    constructor(position, width, height, rotation) {
        super(position);
        this._width = width;
        this._height = height;
        this._rotation = rotation;
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(val) {
        this._height = val;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(rot) {
        this._rotation = rot;
    }
    isPointIn(position) {
        const angle = this._rotation * (Math.PI / 180);
        const translatedX = position.x - this.position.x;
        const translatedY = position.y - this.position.y;
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const rotatedX = translatedX * cosAngle + translatedY * sinAngle;
        const rotatedY = -translatedX * sinAngle + translatedY * cosAngle;
        const halfWidth = this._width / 2;
        const halfHeight = this._height / 2;
        return Math.abs(rotatedX) <= halfWidth && Math.abs(rotatedY) <= halfHeight;
    }
    isEntityIn(entity) {
        return this.isPointIn(entity.position);
    }
}
