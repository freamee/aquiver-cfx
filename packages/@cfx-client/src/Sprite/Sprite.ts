import { RGBA, Vector3 } from '@aquiver-cfx/shared';
import { StreamingGroup, WorldObject } from '../GameObject';

export class Sprite extends WorldObject {
	private static _entities = new Map<number, Sprite>();
	private static _group = new StreamingGroup(32);

	static get all() {
		return [...this._entities.values()];
	}

	static getById(id: number) {
		return this._entities.get(id);
	}

	public textureDictionary: string;
	public textureName: string;
	public scale: number = 1.0;

	private _useStreaming: boolean = false;
	private _streamingDistance: number = -1;

	constructor(
		position: Vector3,
		textureDictionary: string,
		textureName: string,
		useStreaming: boolean = true,
		streamingDistance: number = 16
	) {
		super(position);

		this.textureDictionary = textureDictionary;
		this.textureName = textureName;

		this._useStreaming = useStreaming;
		this._streamingDistance = streamingDistance;

		if (this._useStreaming) {
			Sprite._group.addPool(this);
		}

		Sprite._entities.set(this.id, this);
	}

	get isStreamed() {
		if (this._useStreaming) {
			return Sprite._group.isStreamedIn(this);
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

		Sprite._entities.delete(this.id);

		if (this._useStreaming) {
			Sprite._group.removePool(this);
		}
	}
}
