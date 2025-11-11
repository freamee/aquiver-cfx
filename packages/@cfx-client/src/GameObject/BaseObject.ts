export abstract class BaseObject {
	protected constructor() {}

	cast<T extends BaseObject>(type: new (...args: any[]) => T): this is T {
		return this instanceof type;
	}
}
