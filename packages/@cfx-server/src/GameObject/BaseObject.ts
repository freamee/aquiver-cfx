export abstract class BaseObject {
	private static idCounter = 0;

	private _id: number;

	constructor() {
		this._id = BaseObject.idCounter++;
	}

	get id() {
		return this._id;
	}

	cast<T extends BaseObject>(type: new (...args: any[]) => T): this is T {
		return this instanceof type;
	}
}
