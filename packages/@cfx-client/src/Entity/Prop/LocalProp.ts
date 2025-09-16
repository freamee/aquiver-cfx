import { NetProp } from './NetProp';
import { Vector3 } from '@aquiver-cfx/shared';

/** Model needs to be loaded before creating the entity. */
export class LocalProp extends NetProp {
	protected static _entities = new Map<number, LocalProp>();

	static get all() {
		return [...this._entities.values()];
	}

	constructor(modelHash: string | number, position: Vector3, rotation: Vector3 = new Vector3()) {
		super(
			CreateObjectNoOffset(modelHash, position.x, position.y, position.z, false, true, false)
		);

		this.rotation = rotation;

		LocalProp._entities.set(this.scriptID, this);
	}

	destroy(): void {
		LocalProp._entities.delete(this.scriptID);

		DeleteObject(this.scriptID);
	}
}
