export abstract class Resource {
	private static _name: string = GetCurrentResourceName();

	static get resourceName() {
		return this._name;
	}
}
