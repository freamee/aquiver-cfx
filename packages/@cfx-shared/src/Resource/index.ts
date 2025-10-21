export abstract class Resource {
	private static _name: string = GetCurrentResourceName();

	static get name() {
		return this._name;
	}
}
