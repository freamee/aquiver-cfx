export class Interval {
	private _interval: NodeJS.Timeout | null = null;

	private _callback: () => void;

	private _delay: number;

	constructor(
		callback: () => void,
		delay: number,
		immediate: boolean = false,
		executeAtStart: boolean = false
	) {
		this._callback = callback;
		this._delay = delay;

		if (immediate) this.start();
		if (executeAtStart) this._callback();
	}

	start() {
		if (this._interval !== null) return;

		this._interval = setInterval(this._callback, this._delay);

		return this;
	}

	stop() {
		if (this._interval === null) return;

		clearInterval(this._interval);

		this._interval = null;

		return this;
	}

	isActive() {
		return this._interval !== null;
	}

	destroy() {
		this.stop();
	}
}
