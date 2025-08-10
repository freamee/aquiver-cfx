import { NetVehicle } from './NetVehicle';
import { StreamingGroup } from '../../GameObject';
import { Vector3 } from '@aquiver-cfx/shared';

/** Vehicle model needs to be loaded before creating the entity. */
export class LocalVehicle extends NetVehicle {
	private static _entities = new Map<number, LocalVehicle>();
	private static _group = new StreamingGroup(64);

	static get all() {
		return [...this._entities.values()];
	}

	private _useStreaming: boolean = false;
	private _streamingDistance: number = 256;

	constructor(
		modelHash: string | number,
		position: Vector3,
		rotation: Vector3 = new Vector3(),
		useStreaming: boolean = true,
		streamingDistance: number = 256
	) {
		super(
			CreateVehicle(modelHash, position.x, position.y, position.z, rotation.z, false, true)
		);

		this._useStreaming = useStreaming;
		this._streamingDistance = streamingDistance;

		if (this._useStreaming) {
			LocalVehicle._group.addPool(this);
		}

		LocalVehicle._entities.set(this.id, this);
	}

	get isStreamed() {
		if (this._useStreaming) {
			return LocalVehicle._group.isStreamedIn(this);
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
			LocalVehicle._group.removePool(this);
		}

		LocalVehicle._entities.delete(this.id);

		DeleteVehicle(this.scriptID);
	}
}
