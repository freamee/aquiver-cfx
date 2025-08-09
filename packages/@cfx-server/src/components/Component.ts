export abstract class Component {
	private static idCounter: number = 0;

	protected _id: number;
	protected _onChange: (() => void) | null = null;

	constructor() {
		this._id = Component.idCounter++;
	}

	abstract get type(): string;
	abstract toMeta(): any;

	get id() {
		return this._id;
	}

	setOnChange(callback: () => void): void {
		this._onChange = callback;
	}

	protected triggerChange() {
		if (this._onChange) this._onChange();
	}
}
