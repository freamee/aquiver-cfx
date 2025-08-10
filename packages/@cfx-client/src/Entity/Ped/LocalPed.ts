import { NetPed } from './NetPed';
import { StreamingGroup } from '../../GameObject';
import { Vector3 } from '@aquiver-cfx/shared';

/** Model needs to be loaded before creating the entity. */
export class LocalPed extends NetPed {
	private static _entities = new Map<number, LocalPed>();
	private static _group = new StreamingGroup(64);

	static get all() {
		return [...this._entities.values()];
	}

	private _useStreaming: boolean = false;
	private _streamingDistance: number = 128;

	constructor(
		modelHash: string | number,
		position: Vector3,
		heading: number = 0,
		useStreaming: boolean = true,
		streamingDistance: number = 128
	) {
		super(CreatePed(0, modelHash, position.x, position.y, position.z, heading, false, true));

		this._useStreaming = useStreaming;
		this._streamingDistance = streamingDistance;

		if (this._useStreaming) {
			LocalPed._group.addPool(this);
		}

		LocalPed._entities.set(this.id, this);
	}

	get isStreamed() {
		if (this._useStreaming) {
			return LocalPed._group.isStreamedIn(this);
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
			LocalPed._group.removePool(this);
		}

		LocalPed._entities.delete(this.id);

		DeletePed(this.scriptID);
	}
}
