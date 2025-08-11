import { Vector3 } from '@aquiver-cfx/shared';
import { WorldObject } from '../GameObject';
export class Blip extends WorldObject {
    static _entities = new Map();
    static _remote = new Map();
    static get all() {
        return [...this._entities.values()];
    }
    static getByRemoteId(id) {
        return this._remote.get(id);
    }
    static getById(id) {
        return this._entities.get(id);
    }
    _scriptID = -1;
    constructor(position, remoteId = -1) {
        super(position, remoteId);
        Blip._entities.set(this.id, this);
        if (this.isRemote) {
            Blip._remote.set(this.remoteId, this);
        }
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
        Blip._entities.delete(this.id);
        if (this.isRemote) {
            Blip._remote.delete(this.remoteId);
        }
    }
}
