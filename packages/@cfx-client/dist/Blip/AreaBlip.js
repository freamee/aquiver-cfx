import { Blip } from './Blip';
export class AreaBlip extends Blip {
    static create(position, width, height) {
        const id = AddBlipForArea(position.x, position.y, position.z, width, height);
        const entity = new AreaBlip(id);
        entity.setAreaSize(width, height);
        return entity;
    }
    _width = 0;
    _height = 0;
    constructor(id) {
        super(id);
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
