import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class AreaBlip extends Blip {
	private _width: number = 0;
	private _height: number = 0;

	constructor(position: Vector3, width: number, height: number, remoteId: number = -1) {
		super(position, remoteId);

		this._width = width;
		this._height = height;
	}

	protected createBlip(): number {
		return AddBlipForArea(
			this.position.x,
			this.position.y,
			this.position.z,
			this._width,
			this._height
		);
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
