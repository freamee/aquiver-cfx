export class Tick {
	private _tick: number = -1;

	private _callback: () => void;

	constructor(callback: () => void, immediate: boolean = false) {
		this._callback = callback;

		if (immediate) {
			this.start();
		}
	}

	start() {
		if (this._tick !== -1) return;

		this._tick = setTick(this._callback);
	}

	stop() {
		if (this._tick === -1) return;

		clearTick(this._tick);

		this._tick = -1;
	}

	isActive() {
		return this._tick !== -1;
	}

	destroy() {
		this.stop();
	}
}
