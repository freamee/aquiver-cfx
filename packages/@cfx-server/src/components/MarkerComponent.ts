import { Vector3 } from '@aquiver-cfx/shared';
import { Component } from './Component';

export class MarkerComponent extends Component {
	private _markerType: number;
	private _direction: Vector3;
	private _rotation: Vector3;
	private _scale: number | Vector3;
	private _color: [number, number, number, number];
	private _offset: Vector3;
	private _streamingDistance: number;

	constructor(
		type: number,
		streamingDistance: number = 16,
		offset: Vector3 = new Vector3(0, 0, -1.0)
	) {
		super();

		this._markerType = type;
		this._offset = offset;
		this._direction = new Vector3();
		this._rotation = new Vector3();
		this._scale = 1.0;
		this._color = [0, 130, 153, 125];
		this._streamingDistance = streamingDistance;
	}

	get type(): string {
		return 'marker';
	}

	setColor(rgba: [number, number, number, number]) {
		this._color = rgba;

		this.triggerChange();

		return this;
	}

	setOffset(offset: Vector3) {
		this.offset = offset;

		return this;
	}

	setOffsetZ(z: number) {
		this.offset.setZ(z);

		return this;
	}

	setScale(scale: number | Vector3) {
		this.scale = scale;

		return this;
	}

	setRotation(rot: Vector3) {
		this._rotation = rot;

		return this;
	}

	setDirection(dir: Vector3) {
		this._direction = dir;

		return this;
	}

	get streamingDistance() {
		return this._streamingDistance;
	}

	set streamingDistance(val: number) {
		this._streamingDistance = val;

		this.triggerChange();
	}

	get direction() {
		return this._direction;
	}

	set direction(val: Vector3) {
		this._direction = val;

		this.triggerChange();
	}

	get rotation() {
		return this._rotation;
	}

	set rotation(rot: Vector3) {
		this._rotation = rot;

		this.triggerChange();
	}

	get scale() {
		return this._scale;
	}

	set scale(val: number | Vector3) {
		this._scale = val;

		this.triggerChange();
	}

	get color() {
		return this._color;
	}

	set color(val: [number, number, number, number]) {
		this._color = val;

		this.triggerChange();
	}

	get markerType(): number {
		return this._markerType;
	}

	set markerType(val: number) {
		this._markerType = val;

		this.triggerChange();
	}

	get offset(): Vector3 {
		return this._offset;
	}

	set offset(val: Vector3) {
		this._offset = val;

		this.triggerChange();
	}

	toMeta() {
		return {
			type: this._markerType,
			color: this._color,
			scale: this.scale,
			direction: this._direction,
			rotation: this._rotation,
			streamingDistance: this._streamingDistance,
			offset: this._offset
		};
	}
}
