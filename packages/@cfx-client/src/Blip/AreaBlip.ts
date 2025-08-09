import { Blip } from './Blip';
import { Vector3 } from 'three';

export class AreaBlip extends Blip {
	static create(position: Vector3, width: number, height: number) {
		const id = AddBlipForArea(position.x, position.y, position.z, width, height);

		const entity = new AreaBlip(id);

		entity.setAreaSize(width, height);

		return entity;
	}

	private _width: number = 0;
	private _height: number = 0;

	constructor(id: number) {
		super(id);
	}

	setAreaSize(width: number, height: number) {
		this._width = width;
		this._height = height;

		SetBlipScaleTransformation(this.scriptID, width, height);
	}

	get width() {
		return this._width;
	}

	set width(width: number) {
		this._width = width;

		SetBlipScaleTransformation(this.scriptID, this._width, this._height);
	}

	get height() {
		return this._height;
	}

	set height(height: number) {
		this._height = height;

		SetBlipScaleTransformation(this.scriptID, this._width, this._height);
	}
}
