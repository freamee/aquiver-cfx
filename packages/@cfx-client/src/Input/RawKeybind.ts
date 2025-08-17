import { Tick } from '../utils';

type Callback = () => void;

export class RawKeybind {
	private static bindsMap = new Map<
		number,
		{
			keydown: Set<Callback>;
			keyup: Set<Callback>;
		}
	>();

	private static tick = new Tick(() => {
		for (const [keyCode, binds] of this.bindsMap.entries()) {
			if (IsRawKeyPressed(keyCode)) {
				[...binds.keydown].forEach((cb) => cb());
			}

			if (IsRawKeyReleased(keyCode)) {
				[...binds.keyup].forEach((cb) => cb());
			}
		}

		if (this.bindsMap.size === 0) this.tick.stop();
	});

	private keyCodes: number[];
	private callback: Callback;
	private eventType: 'keydown' | 'keyup';
	private isDestroyed = false;

	constructor(
		keyCode: number | number[],
		callback: Callback,
		eventType: 'keydown' | 'keyup' = 'keyup'
	) {
		this.keyCodes = Array.isArray(keyCode) ? keyCode : [keyCode];
		this.callback = callback;
		this.eventType = eventType;

		this.register();

		RawKeybind.tick.start();
	}

	private register() {
		if (this.isDestroyed) return;

		this.keyCodes.forEach((code) => {
			if (!RawKeybind.bindsMap.has(code)) {
				RawKeybind.bindsMap.set(code, { keydown: new Set(), keyup: new Set() });
			}

			const binds = RawKeybind.bindsMap.get(code)!;

			if (!binds[this.eventType].has(this.callback)) {
				binds[this.eventType].add(this.callback);
			}
		});
	}

	destroy() {
		if (this.isDestroyed) return;

		this.keyCodes.forEach((keyCode) => {
			const binds = RawKeybind.bindsMap.get(keyCode);
			if (binds) {
				binds[this.eventType].delete(this.callback);

				if (binds.keydown.size === 0 && binds.keyup.size === 0) {
					RawKeybind.bindsMap.delete(keyCode);
				}
			}
		});

		this.isDestroyed = true;

		if (RawKeybind.bindsMap.size === 0) {
			RawKeybind.tick.stop();
		}
	}
}
