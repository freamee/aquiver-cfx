import { Vector2, Vector3 } from '@aquiver-cfx/shared';
import { Tick } from '../utils';

class Cursor {
	public forced: boolean = false;

	private _cursor: number = 0;

	private _visible: boolean = false;

	private _everyTick: Tick;

	constructor() {
		RegisterCommand(
			'toggleCursorState',
			() => {
				this.visible = !this.visible;
			},
			false
		);

		RegisterKeyMapping('toggleCursorState', 'Show / Hide cursor', 'keyboard', 'm');

		this._everyTick = new Tick(this.tick.bind(this));
	}

	/** [0.0, 1.0] */
	get screenPosition() {
		const [resolutionX, resolutionY] = GetActiveScreenResolution();
		const screenResolutionPosition = this.absolutePosition;

		const calcX = screenResolutionPosition.x / resolutionX;
		const calcY = screenResolutionPosition.y / resolutionY;

		return new Vector2(calcX, calcY);
	}

	set screenPosition(val: Vector2) {
		SetCursorLocation(val.x, val.y);
	}

	/** Returns the resolution cursor 2d position. 0-1920 x 0-1080 */
	get absolutePosition() {
		const [cursorX, cursorY] = GetNuiCursorPosition();

		return new Vector2(cursorX, cursorY);
	}

	get worldPosition() {
		const { x, y } = this.screenPosition;

		const [[worldX, worldY, worldZ]] = GetWorldCoordFromScreenCoord(x, y);

		return new Vector3(worldX, worldY, worldZ);
	}

	get visible() {
		return this._visible;
	}

	set visible(value: boolean) {
		if (this.forced) {
			console.info("Can not set cursor state 'visible' because its forced.");
		} else {
			this._visible = value;

			value ? this._everyTick.start() : this._everyTick.stop();

			if (value) {
				if (this._cursor !== 1) {
					this._cursor = 1;

					SetNuiFocus(true, true);
					SetNuiFocusKeepInput(true);
				}
			} else {
				if (this._cursor !== 0) {
					this._cursor = 0;

					SetNuiFocus(false, false);
					SetNuiFocusKeepInput(false);
				}
			}
		}
	}

	isNearToScreenPosition(screenX: number, screenY: number, range: number) {
		const current = this.screenPosition;

		const x = Math.abs(current.x - screenX);
		const y = Math.abs(current.y - screenY);

		return x <= range && y <= range;
	}

	/** Handle to disable controls. */
	private tick() {
		DisableAllControlActions(0);
	}
}

export default new Cursor();
