import { StreamingGroup } from '@/StreamingGroup';
import { WorldObject } from '@/WorldObject';
import { RGBA } from '@aquiver-cfx/shared';
import { Vector3 } from 'three';

export class Label extends WorldObject {
	private static _entities = new Map<number, Label>();
	private static _group = new StreamingGroup(64);

	static get all() {
		return [...this._entities.values()];
	}

	static getById(id: number) {
		return this._entities.get(id);
	}

	public text: string = '';
	public scale: number = 1.0;
	public color: RGBA = RGBA.white;
	public center: boolean = true;

	private _useStreaming: boolean = false;
	private _streamingDistance: number = -1;

	constructor(
		text: string,
		position: Vector3,
		color: RGBA = RGBA.white,
		useStreaming: boolean = true,
		streamingDistance: number = 32
	) {
		super(position);

		this.text = text;
		this.color = color;

		this._useStreaming = useStreaming;
		this._streamingDistance = streamingDistance;

		if (this._useStreaming) {
			Label._group.addPool(this);
		}

		Label._entities.set(this.id, this);
	}

	get isStreamed() {
		if (this._useStreaming) {
			return Label._group.isStreamedIn(this);
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

		Label._entities.delete(this.id);

		if (this._useStreaming) {
			Label._group.removePool(this);
		}
	}
}
