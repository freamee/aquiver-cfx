import { NetProp } from './NetProp';
import { StreamingGroup } from '../../GameObject';
import { Vector3 } from '@aquiver-cfx/shared';

/** Model needs to be loaded before creating the entity. */
export class LocalProp extends NetProp {
	private static _entities = new Map<number, LocalProp>();
	private static _group = new StreamingGroup(64);

	static get all() {
		return [...this._entities.values()];
	}

	private _useStreaming: boolean = false;
	private _streamingDistance: number = 128;

	constructor(
		modelHash: string | number,
		position: Vector3,
		rotation: Vector3 = new Vector3(),
		useStreaming: boolean = true,
		streamingDistance: number = 128
	) {
		super(
			CreateObjectNoOffset(modelHash, position.x, position.y, position.z, false, true, false)
		);

		this.rotation = rotation;

		this._useStreaming = useStreaming;
		this._streamingDistance = streamingDistance;

		if (this._useStreaming) {
			LocalProp._group.addPool(this);
		}

		LocalProp._entities.set(this.id, this);
	}

	get isStreamed() {
		if (this._useStreaming) {
			return LocalProp._group.isStreamedIn(this);
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

		if (this._useStreaming) {
			LocalProp._group.removePool(this);
		}

		LocalProp._entities.delete(this.id);

		DeleteObject(this.scriptID);
	}
}
