import { Vector3 } from '@aquiver-cfx/shared';
import { Blip } from './Blip';

export class AreaBlip extends Blip {
	protected static override entities = new Map<number, AreaBlip>();

	private _width: number;
	private _height: number;

	constructor(
		position: Vector3,
		dimension: number,
		width: number,
		height: number,
		global: boolean = true
	) {
		super('AreaBlip', position, dimension, global);

		this._width = width;
		this._height = height;

		AreaBlip.entities.set(this.id, this);
	}

	get height() {
		return this._height;
	}

	set height(height: number) {
		this._height = height;
	}

	get width() {
		return this._width;
	}

	set width(width: number) {
		this._width = width;
	}

	toJSON() {
		return {
			...super.toJSON(),
			height: this._height,
			width: this._width
		};
	}

	destroy(): void {
		super.destroy();

		AreaBlip.entities.delete(this.id);
	}
}
