import { Vector3 } from 'three';
import { Component } from './Component';

export class SpriteComponent extends Component {
	private _textureDict: string;
	private _textureName: string;
	private _scale: number;
	private _streamingDistance: number;
	private _offset: Vector3;
	private _visible: boolean = true;

	constructor(
		textureDict: string,
		textureName: string,
		scale: number = 1.0,
		streamingDistance: number = 16
	) {
		super();

		this._textureDict = textureDict;
		this._textureName = textureName;
		this._scale = scale;
		this._streamingDistance = streamingDistance;
		this._offset = new Vector3();
	}

	get type(): string {
		return 'sprite';
	}

	setSprite(textureDict: string, textureName: string) {
		this._textureDict = textureDict;
		this._textureName = textureName;

		this.triggerChange();
	}

	setScale(scale: number) {
		this._scale = scale;

		this.triggerChange();

		return this;
	}

	setOffsetZ(z: number) {
		this._offset.setZ(z);

		this.triggerChange();

		return this;
	}

	setOffset(offset: Vector3) {
		this._offset = offset;

		this.triggerChange();

		return this;
	}

	show() {
		if (this._visible === true) return;

		this._visible = true;

		this.triggerChange();
	}

	hide() {
		if (this._visible === false) return;

		this._visible = false;

		this.triggerChange();
	}

	toMeta() {
		return {
			textureDict: this._textureDict,
			textureName: this._textureName,
			scale: this._scale,
			streamingDistance: this._streamingDistance,
			offset: this._offset,
			visible: this._visible
		};
	}
}
