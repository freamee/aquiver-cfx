export abstract class BaseObject {
	protected static entities = new Map<number, BaseObject>();

	static getByID(id: number) {
		return this.entities.get(id);
	}

	static get all() {
		return Array.from(this.entities.values());
	}

	static get count() {
		return this.entities.size;
	}

	private static idCounter = 0;

	private _id: number;

	constructor() {
		this._id = BaseObject.idCounter++;

		BaseObject.entities.set(this.id, this);
	}

	get id() {
		return this._id;
	}

	cast<T extends BaseObject>(type: new (...args: any[]) => T): this is T {
		return this instanceof type;
	}

	destroy() {
		BaseObject.entities.delete(this.id);
	}
}
