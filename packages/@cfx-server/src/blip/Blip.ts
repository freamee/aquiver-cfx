import { Vector3 } from '@aquiver-cfx/shared';
import { StreamingGroup, WorldObject } from '../GameObject';

export abstract class Blip extends WorldObject {
	protected static override entities = new Map<number, Blip>();

	private static readonly streamingGroup = new StreamingGroup(Infinity);

	private _blipType: string;

	private _sprite: number = 0;
	private _scale: number = 1.0;
	private _alpha: number = 255;
	private _rotation: number = 0;
	private _name: string = '';
	private _isShortRange: boolean = false;
	private _color: number = -1;

	constructor(type: string, position: Vector3, dimension: number = 0, global: boolean = true) {
		super(position, dimension, Blip.streamingGroup, Infinity, global);

		this._blipType = type;

		Blip.entities.set(this.id, this);
	}

	get blipType() {
		return this._blipType;
	}

	get name() {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
	}

	get isShortRange() {
		return this._isShortRange;
	}

	set isShortRange(value: boolean) {
		this._isShortRange = value;
	}

	get sprite() {
		return this._sprite;
	}

	set sprite(sprite: number) {
		this._sprite = sprite;
	}

	get scale() {
		return this._scale;
	}

	set scale(scale: number) {
		this._scale = scale;
	}

	get alpha() {
		return this._alpha;
	}

	set alpha(alpha: number) {
		this._alpha = alpha;
	}

	get rotation() {
		return this._rotation;
	}

	set rotation(value: number) {
		this._rotation = value;
	}

	get color() {
		return this._color;
	}

	set color(color: number) {
		this._color = color;
	}

	toJSON() {
		return {
			...super.toJSON(),
			sprite: this._sprite,
			scale: this._scale,
			alpha: this._alpha,
			rotation: this._rotation,
			name: this._name,
			isShortRange: this._isShortRange,
			color: this._color
		};
	}

	destroy(): void {
		super.destroy();

		Blip.entities.delete(this.id);
	}
}
