import { NetVehicle } from './NetVehicle';
import { Vector3 } from '@aquiver-cfx/shared';

/** Vehicle model needs to be loaded before creating the entity. */
export class LocalVehicle extends NetVehicle {
	protected static _entities = new Map<number, LocalVehicle>();

	static get all() {
		return [...this._entities.values()];
	}

	constructor(modelHash: string | number, position: Vector3, rotation: Vector3 = new Vector3()) {
		super(
			CreateVehicle(modelHash, position.x, position.y, position.z, rotation.z, false, true)
		);

		LocalVehicle._entities.set(this.scriptID, this);
	}

	destroy(): void {
		LocalVehicle._entities.delete(this.scriptID);

		DeleteVehicle(this.scriptID);
	}
}
