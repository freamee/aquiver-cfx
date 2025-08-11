import { Vector3 } from '@aquiver-cfx/shared';
import { Component } from './Component';

export class TextComponent extends Component {
	private _text: string;
	private _streamingDistance: number;
	private _offset: Vector3;

	constructor(text: string = '', streamingDistance: number = 16) {
		super();

		this._text = text;
		this._streamingDistance = streamingDistance;
		this._offset = new Vector3();
	}

	get type(): string {
		return 'text';
	}

	get offset(): Vector3 {
		return this._offset;
	}

	set offset(val: Vector3) {
		this._offset = val;

		this.triggerChange();
	}

	setOffset(offset: Vector3) {
		this.offset = offset;

		return this;
	}

	setOffsetZ(z: number) {
		this.offset.setZ(z);

		return this;
	}

	toMeta() {
		return {
			text: this._text,
			streamingDistance: this._streamingDistance,
			offset: this._offset
		};
	}
}
