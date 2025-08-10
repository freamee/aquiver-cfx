import { Vector3 } from '@aquiver-cfx/shared';
import { WorldObject } from '../GameObject';

export abstract class Blip extends WorldObject {
	protected static override entities = new Map<number, Blip>();

	static override get all() {
		return [...this.entities.values()];
	}

	static getById(id: number) {
		return this.entities.get(id);
	}

	protected constructor(private _scriptID: number) {
		super(new Vector3());

		Blip.entities.set(this.id, this);
	}

	get isValid() {
		return !!DoesBlipExist(this._scriptID);
	}

	get scriptID() {
		return this._scriptID;
	}

	set name(name: string) {
		AddTextEntry('MYBLIP', name);
		BeginTextCommandSetBlipName('MYBLIP');
		EndTextCommandSetBlipName(this._scriptID);
	}

	get position() {
		const [x, y, z] = GetBlipInfoIdCoord(this._scriptID);

		return new Vector3(x, y, z);
	}

	set position(pos: Vector3) {
		super.position = pos;

		SetBlipCoords(this._scriptID, pos.x, pos.y, pos.z);
	}

	set rotation(rot: number) {
		SetBlipRotation(this._scriptID, rot);
	}

	get rotation() {
		return GetBlipRotation(this._scriptID);
	}

	get alpha(): number {
		return GetBlipAlpha(this._scriptID);
	}

	set alpha(alpha: number) {
		SetBlipAlpha(this._scriptID, alpha);
	}

	get color(): number {
		return GetBlipColour(this._scriptID);
	}

	set color(color: number) {
		SetBlipColour(this._scriptID, color);
	}

	get sprite(): number {
		return GetBlipSprite(this._scriptID);
	}

	set sprite(sprite: number) {
		SetBlipSprite(this._scriptID, sprite);
	}

	set scale(scale: number) {
		SetBlipScale(this._scriptID, scale);
	}

	set display(display: number) {
		SetBlipDisplay(this._scriptID, display);
	}

	set category(category: number) {
		SetBlipCategory(this._scriptID, category);
	}

	get isFlashing(): boolean {
		return !!IsBlipFlashing(this._scriptID);
	}

	set isFlashing(flashing: boolean) {
		SetBlipFlashes(this._scriptID, flashing);
	}

	get isShortRange(): boolean {
		return !!IsBlipShortRange(this._scriptID);
	}

	set isShortRange(shortRange: boolean) {
		SetBlipAsShortRange(this._scriptID, shortRange);
	}

	set isRoute(state: boolean) {
		SetBlipRoute(this._scriptID, state);
	}

	set routeColor(color: number) {
		SetBlipRouteColour(this._scriptID, color);
	}

	destroy(): void {
		super.destroy();

		if (this.isValid) {
			RemoveBlip(this._scriptID);
		}

		Blip.entities.delete(this.id);
	}
}
