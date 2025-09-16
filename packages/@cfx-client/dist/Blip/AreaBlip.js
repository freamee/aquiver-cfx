import { Blip } from './Blip';
export class AreaBlip extends Blip {
    _width = 0;
    _height = 0;
    constructor(position, width, height) {
        super(AddBlipForArea(position.x, position.y, position.z, width, height));
        this._width = width;
        this._height = height;
    }
    setAreaSize(width, height) {
        this._width = width;
        this._height = height;
        SetBlipScaleTransformation(this.scriptID, width, height);
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
        SetBlipScaleTransformation(this.scriptID, this._width, this._height);
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
        SetBlipScaleTransformation(this.scriptID, this._width, this._height);
    }
}
