import { NetPed } from './NetPed';
import { Vector3 } from '@aquiver-cfx/shared';

/** Model needs to be loaded before creating the entity. */
export class LocalPed extends NetPed {
	protected static _entities = new Map<number, LocalPed>();

	static get all() {
		return [...this._entities.values()];
	}

	constructor(modelHash: string | number, position: Vector3, heading: number = 0) {
		super(CreatePed(0, modelHash, position.x, position.y, position.z, heading, false, true));

		LocalPed._entities.set(this.scriptID, this);
	}

	destroy(): void {
		LocalPed._entities.delete(this.scriptID);

		DeletePed(this.scriptID);
	}
}
