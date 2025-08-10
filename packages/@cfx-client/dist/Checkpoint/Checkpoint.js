import _ from 'lodash';
import { CircleColshape } from '../Colshape/CircleColshape';
import { Vector3 } from 'three';
import { RGBA } from '@aquiver-cfx/shared';
export class Checkpoint extends CircleColshape {
    static entities = new Map();
    static getByID(id) {
        return this.entities.get(id);
    }
    static getInitialOptions() {
        return {
            destination: new Vector3(),
            color: new RGBA(0, 130, 153, 125)
        };
    }
    _checkpointType;
    _destination;
    _color;
    _scriptID;
    constructor(type, position, radius, options = {}) {
        super(position, radius);
        const { destination, color } = _.merge(Checkpoint.getInitialOptions(), options);
        this._checkpointType = type;
        this._destination = destination;
        this._color = color;
        const [r, g, b, a] = this.color.toArray();
        this._scriptID = CreateCheckpoint(type, position.x, position.y, position.z, destination.x, destination.y, destination.z, radius, r, g, b, a, 0);
        this.destination = this._destination;
        SetCheckpointIconHeight(this._scriptID, 1.0);
    }
    get scriptID() {
        return this._scriptID;
    }
    get checkpointType() {
        return this._checkpointType;
    }
    get destination() {
        return this._destination;
    }
    set destination(position) {
        this._destination = position;
        if (this._destination.distanceTo(this.position) > 2.5 &&
            !this._destination.equals(Checkpoint.getInitialOptions().destination)) {
            SetCheckpointIconRgba(this._scriptID, 255, 255, 255, 155);
        }
        else {
            SetCheckpointIconRgba(this._scriptID, 0, 0, 0, 0);
        }
        N_0x3c788e7f6438754d(this._scriptID, this._destination.x, this._destination.y, this._destination.z);
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
    destroy() {
        super.destroy();
        DeleteCheckpoint(this._scriptID);
    }
}
