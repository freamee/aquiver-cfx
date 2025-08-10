import { Vector3 } from '@aquiver-cfx/shared';
import type { NetEntity } from '../Entity';
import { Colshape } from './Colshape';

export class AreaColshape extends Colshape {
	private _width: number = 0;
	private _height: number = 0;
	private _rotation: number = 0;

	constructor(position: Vector3, width: number, height: number, rotation: number) {
		super(position);

		this._width = width;
		this._height = height;
		this._rotation = rotation;
	}

	get width() {
		return this._width;
	}

	set width(width: number) {
		this._width = width;
	}

	get height() {
		return this._height;
	}

	set height(val: number) {
		this._height = val;
	}

	get rotation() {
		return this._rotation;
	}

	set rotation(rot: number) {
		this._rotation = rot;
	}

	isPointIn(position: Vector3): boolean {
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

	isEntityIn(entity: NetEntity): boolean {
		return this.isPointIn(entity.position);
	}
}
