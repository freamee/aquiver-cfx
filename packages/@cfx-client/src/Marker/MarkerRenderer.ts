import { Graphics } from '../Game';
import { Tick } from '../utils';
import { Marker } from './Marker';

export class MarkerRenderer {
	private _tick: Tick;

	constructor() {
		this._tick = new Tick(this.func.bind(this), true);
	}

	private func() {
		const streamedMarkers = Marker.all.filter((marker) => marker.isStreamed);

		for (const marker of streamedMarkers) {
			Graphics.drawMarker(
				marker.markerType,
				marker.position,
				marker.scale,
				marker.color,
				marker.rotation,
				marker.direction,
				marker.bobUpAndDown,
				marker.faceCamera,
				marker.rotate
			);
		}
	}
}
