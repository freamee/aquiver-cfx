import { Vector3 } from '@aquiver-cfx/shared';
import { WorldObject } from '../GameObject';
export class Blip extends WorldObject {
    _scriptID;
    static entities = new Map();
    static get all() {
        return [...this.entities.values()];
    }
    static getById(id) {
        return this.entities.get(id);
    }
    constructor(_scriptID) {
        super(new Vector3());
        this._scriptID = _scriptID;
        Blip.entities.set(this.id, this);
    }
    get isValid() {
        return !!DoesBlipExist(this._scriptID);
    }
    get scriptID() {
        return this._scriptID;
    }
    set name(name) {
        AddTextEntry('MYBLIP', name);
        BeginTextCommandSetBlipName('MYBLIP');
        EndTextCommandSetBlipName(this._scriptID);
    }
    get position() {
        const [x, y, z] = GetBlipInfoIdCoord(this._scriptID);
        return new Vector3(x, y, z);
    }
    set position(pos) {
        super.position = pos;
        SetBlipCoords(this._scriptID, pos.x, pos.y, pos.z);
    }
    set rotation(rot) {
        SetBlipRotation(this._scriptID, rot);
    }
    get rotation() {
        return GetBlipRotation(this._scriptID);
    }
    get alpha() {
        return GetBlipAlpha(this._scriptID);
    }
    set alpha(alpha) {
        SetBlipAlpha(this._scriptID, alpha);
    }
    get color() {
        return GetBlipColour(this._scriptID);
    }
    set color(color) {
        SetBlipColour(this._scriptID, color);
    }
    get sprite() {
        return GetBlipSprite(this._scriptID);
    }
    set sprite(sprite) {
        SetBlipSprite(this._scriptID, sprite);
    }
    set scale(scale) {
        SetBlipScale(this._scriptID, scale);
    }
    set display(display) {
        SetBlipDisplay(this._scriptID, display);
    }
    set category(category) {
        SetBlipCategory(this._scriptID, category);
    }
    get isFlashing() {
        return !!IsBlipFlashing(this._scriptID);
    }
    set isFlashing(flashing) {
        SetBlipFlashes(this._scriptID, flashing);
    }
    get isShortRange() {
        return !!IsBlipShortRange(this._scriptID);
    }
    set isShortRange(shortRange) {
        SetBlipAsShortRange(this._scriptID, shortRange);
    }
    set isRoute(state) {
        SetBlipRoute(this._scriptID, state);
    }
    set routeColor(color) {
        SetBlipRouteColour(this._scriptID, color);
    }
    destroy() {
        super.destroy();
        if (this.isValid) {
            RemoveBlip(this._scriptID);
        }
        Blip.entities.delete(this.id);
    }
}
