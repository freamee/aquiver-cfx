import { Tick } from '../utils';

type Callback = () => void;

export class Keybind {
	private static bindsMap = new Map<
		number,
		{
			keydown: Set<Callback>;
			keyup: Set<Callback>;
		}
	>();

	private static tick = new Tick(() => {
		for (const [keyCode, binds] of this.bindsMap.entries()) {
			if (IsControlJustPressed(0, keyCode)) {
				[...binds.keydown].forEach((cb) => cb());
			}

			if (IsControlJustReleased(0, keyCode)) {
				[...binds.keyup].forEach((cb) => cb());
			}
		}

		if (this.bindsMap.size === 0) this.tick.stop();
	});

	private keyCodes: number[];
	private callback: Callback;
	private eventType: 'keydown' | 'keyup';
	private isDestroyed: boolean = false;

	constructor(
		keyCode: number | number[],
		callback: () => void,
		eventType: 'keydown' | 'keyup' = 'keyup'
	) {
		this.keyCodes = Array.isArray(keyCode) ? keyCode : [keyCode];
		this.callback = callback;
		this.eventType = eventType;

		this.register();

		Keybind.tick.start();
	}

	private register() {
		if (this.isDestroyed) return;

		this.keyCodes.forEach((code) => {
			if (!Keybind.bindsMap.has(code)) {
				Keybind.bindsMap.set(code, { keydown: new Set(), keyup: new Set() });
			}

			const binds = Keybind.bindsMap.get(code)!;

			if (!binds[this.eventType].has(this.callback)) {
				binds[this.eventType].add(this.callback);
			}
		});
	}

	destroy() {
		if (this.isDestroyed) return;

		this.keyCodes.forEach((keyCode) => {
			const binds = Keybind.bindsMap.get(keyCode);
			if (binds) {
				binds[this.eventType].delete(this.callback);

				if (binds.keydown.size === 0 && binds.keyup.size === 0) {
					Keybind.bindsMap.delete(keyCode);
				}
			}
		});

		this.isDestroyed = true;

		if (Keybind.bindsMap.size === 0) {
			Keybind.tick.stop();
		}
	}
}
