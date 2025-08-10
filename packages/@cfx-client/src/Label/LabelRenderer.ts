import { Graphics } from '@/Game';
import { Tick } from '@/utils';
import { Label } from './Label';

export class LabelRenderer {
	private _tick: Tick;

	constructor() {
		this._tick = new Tick(this.func.bind(this), true);
	}

	private func() {
		const streamed = Label.all.filter((marker) => marker.isStreamed);

		for (const entity of streamed) {
			Graphics.drawTextThisFrame3D(
				entity.position,
				entity.text,
				entity.scale,
				entity.color,
				entity.center
			);
		}
	}
}
