import { StreamingGroup } from '../StreamingGroup';
import { BaseObject } from '@/BaseObject';
import { Vector3 } from 'three';

export abstract class Blip extends BaseObject {
	private static GetInitialState() {
		return {
			color: 0,
			isFlashing: false,
			isShortRange: false,
			name: 'Blip',
			scale: 1.0,
			sprite: 1,
			alpha: 255,
			display: 2
		};
	}

	static readonly streamingGroup = new StreamingGroup(Infinity);

	private _blipType: string;

	constructor(type: string, position: Vector3, dimension: number = 0, global: boolean = true) {
		super(true);

		this._blipType = type;
	}

	get blipType() {
		return this._blipType;
	}

	// get alpha() {
	// 	return this._state.alpha;
	// }

	// set alpha(alpha: number) {
	// 	this._state.alpha = alpha;

	// 	this.sync();
	// }

	// get rotation() {
	// 	return this._state.rotation;
	// }

	// set rotation(rot: number) {
	// 	this._state.rotation = rot;

	// 	this.sync();
	// }

	// get scale() {
	// 	return this._state.scale;
	// }

	// set scale(scale: number) {
	// 	this._state.scale = scale;

	// 	this.sync();
	// }

	// get color(): altShared.BlipColor {
	// 	return this._state.color;
	// }

	// set color(color: altShared.BlipColor) {
	// 	this._state.color = color;

	// 	this.sync();
	// }

	// get sprite(): altShared.BlipSprite {
	// 	return this._state.sprite;
	// }

	// set sprite(sprite: altShared.BlipSprite) {
	// 	this._state.sprite = sprite;

	// 	this.sync();
	// }

	// get name() {
	// 	return this._state.name;
	// }

	// set name(name: string) {
	// 	this._state.name = name;

	// 	this.sync();
	// }

	// get isShortRange() {
	// 	return this._state.isShortRange;
	// }

	// set isShortRange(state: boolean) {
	// 	this._state.isShortRange = state;

	// 	this.sync();
	// }

	// get isFlashing() {
	// 	return this._state.isFlashing;
	// }

	// set isFlashing(state: boolean) {
	// 	this._state.isFlashing = state;

	// 	this.sync();
	// }

	// get isRoute() {
	// 	return this._state.isRoute;
	// }

	// set isRoute(state: boolean) {
	// 	this._state.isRoute = state;

	// 	this.sync();
	// }

	// get routeColor() {
	// 	return this._state.routeColor;
	// }

	// set routeColor(color: number) {
	// 	this._state.routeColor = color;

	// 	this.sync();
	// }

	// @Debounce(50)
	// protected sync() {
	// 	this.cbStreamedEntities((targetSource) => {
	// 		emitNet('blip:sync', targetSource, this.id, this._state);
	// 	});
	// }
}
