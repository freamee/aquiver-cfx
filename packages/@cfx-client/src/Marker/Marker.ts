import { RGBA, Vector3 } from '@aquiver-cfx/shared';
import { StreamingGroup, WorldObject } from '../GameObject';

export class Marker extends WorldObject {
	protected static _entities = new Map<number, Marker>();
	private static _group = new StreamingGroup(64);

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

	private _useStreaming: boolean = false;
	private _streamingDistance: number = -1;

	constructor(
		type: number,
		position: Vector3,
		color: RGBA = RGBA.white,
		useStreaming: boolean = true,
		streamingDistance: number = 128
	) {
		super(position);

		this.markerType = type;
		this.color = color;

		this._useStreaming = useStreaming;
		this._streamingDistance = streamingDistance;

		if (this._useStreaming) {
			Marker._group.addPool(this);
		}

		Marker._entities.set(this.id, this);
	}

	get isStreamed() {
		if (this._useStreaming) {
			return Marker._group.isStreamedIn(this);
		}

		return true;
	}

	get useStreaming() {
		return this._useStreaming;
	}

	get streamingDistance() {
		return this._streamingDistance;
	}

	destroy(): void {
		super.destroy();

		Marker._entities.delete(this.id);

		if (this._useStreaming) {
			Marker._group.removePool(this);
		}
	}
}
