import { Graphics } from '../Game';
import { Tick } from '../utils';
import { Sprite } from './Sprite';

export class SpriteRenderer {
	private _tick: Tick;

	constructor() {
		this._tick = new Tick(this.func.bind(this), true);
	}

	private func() {
		const streamed = Sprite.all.filter((marker) => marker.isStreamed);

		for (const entity of streamed) {
			Graphics.drawSprite3D(
				entity.textureDictionary,
				entity.textureName,
				entity.position,
				entity.scale
			);
		}
	}
}
