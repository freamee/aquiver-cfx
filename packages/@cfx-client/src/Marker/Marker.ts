import { WorldObject } from '@/WorldObject';
import { RGBA } from '@aquiver-cfx/shared';
import { Vector3 } from 'three';

export class Marker extends WorldObject {
	private static _entities = new Map<number, Marker>();

	static get all() {
		return [...this._entities.values()];
	}

	static getById(id: number) {
		return this._entities.get(id);
	}

	public markerType: number = 0;
	public color: RGBA = RGBA.white;
	public scale: Vector3 = new Vector3(1, 1, 1);
	public rotation: Vector3 = new Vector3(0, 0, 0);
	public direction: Vector3 = new Vector3(0, 0, 0);
	public faceCamera: boolean = false;
	public rotate: boolean = false;
	public bobUpAndDown: boolean = false;

	constructor(
		type: number,
		position: Vector3,
		color: RGBA,
		useStreaming: boolean = true,
		streamingDistance: number = 128
	) {
		super(position);

		this.markerType = type;
		this.color = color;

		Marker._entities.set(this.id, this);
	}

	destroy(): void {
		super.destroy();

		Marker._entities.delete(this.id);
	}
}
