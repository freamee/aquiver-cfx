import { NetEntity } from '../NetEntity';

export class NetVehicle extends NetEntity {
	static getByScriptId(id: number) {
		return new NetVehicle(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return new NetVehicle(entity);
	}

	protected _stateBag: StateBagInterface;

	constructor(private _scriptID: number) {
		super();

		this._stateBag = Entity(this.scriptID).state;
	}

	get scriptID(): number {
		return this._scriptID;
	}

	get trailer() {
		const [_, id] = GetVehicleTrailerVehicle(this.scriptID);

		return NetVehicle.getByScriptId(id);
	}

	get steeringAngle() {
		return GetVehicleSteeringAngle(this.scriptID);
	}

	set steeringAngle(angle: number) {
		SetVehicleSteeringAngle(this.scriptID, angle);
	}

	get engineTemperature() {
		return GetVehicleEngineTemperature(this.scriptID);
	}

	set engineTemperature(temperature: number) {
		SetVehicleEngineTemperature(this.scriptID, temperature);
	}

	get alarmState() {
		return !!IsVehicleAlarmActivated(this.scriptID);
	}

	set alarmState(state: boolean) {
		SetVehicleAlarm(this.scriptID, state);
	}

	get isVehicleRadioOn() {
		return !!IsVehicleRadioOn(this.scriptID);
	}

	get isRadioEnabled() {
		return !!IsVehicleRadioEnabled(this.scriptID);
	}

	set isRadioEnabled(state: boolean) {
		SetVehicleRadioEnabled(this.scriptID, state);
	}

	get lockState() {
		return GetVehicleDoorLockStatus(this.scriptID);
	}

	set lockState(lockStatus: number) {
		SetVehicleDoorsLocked(this.scriptID, lockStatus);
	}

	get classType() {
		return GetVehicleClass(this.scriptID);
	}

	get handbrakeOn() {
		return !!GetVehicleHandbrake(this.scriptID);
	}

	set handbrakeOn(state: boolean) {
		SetVehicleHandbrake(this.scriptID, state);
	}

	get engineOn() {
		return !!IsVehicleEngineOn(this.scriptID);
	}

	set engineOn(state: boolean) {
		SetVehicleEngineOn(this.scriptID, state, true, true);
	}

	isSeatFree(seatIndex: number) {
		return !!IsVehicleSeatFree(this.scriptID, seatIndex);
	}

	set indicatorLeft(state: boolean) {
		SetVehicleIndicatorLights(this.scriptID, 1, state);
	}

	get indicatorLeft() {
		const state = GetVehicleIndicatorLights(this.scriptID);

		return [1, 3].includes(state);
	}

	set indicatorRight(state: boolean) {
		SetVehicleIndicatorLights(this.scriptID, 0, state);
	}

	get indicatorRight() {
		const state = GetVehicleIndicatorLights(this.scriptID);

		return [2, 3].includes(state);
	}

	get currentGear() {
		return GetVehicleCurrentGear(this.scriptID);
	}

	set currentGear(gear: number) {
		SetVehicleCurrentGear(this.scriptID, gear);
	}

	get rpm() {
		return GetVehicleCurrentRpm(this.scriptID);
	}

	set rpm(count: number) {
		SetVehicleCurrentRpm(this.scriptID, count);
	}

	get speed() {
		return GetEntitySpeed(this.scriptID);
	}

	get speedVector() {
		return GetEntitySpeedVector(this.scriptID, false);
	}

	get seatCount() {
		return GetVehicleModelNumberOfSeats(this.model);
	}

	get bodyHealth(): number {
		return GetVehicleBodyHealth(this.scriptID);
	}

	set bodyHealth(hp: number) {
		SetVehicleBodyHealth(this.scriptID, hp);
	}

	get engineHealth(): number {
		return GetVehicleEngineHealth(this.scriptID);
	}

	set engineHealth(hp: number) {
		SetVehicleEngineHealth(this.scriptID, hp);
	}

	get petrolTankHealth(): number {
		return GetVehiclePetrolTankHealth(this.scriptID);
	}

	set petrolTankHealth(hp: number) {
		SetVehiclePetrolTankHealth(this.scriptID, hp);
	}

	get numberPlate(): string {
		return GetVehicleNumberPlateText(this.scriptID);
	}

	set numberPlate(text: string) {
		SetVehicleNumberPlateText(this.scriptID, text.substring(0, 8));
	}

	get dirtLevel() {
		return GetVehicleDirtLevel(this.scriptID);
	}

	set dirtLevel(level: number) {
		SetVehicleDirtLevel(this.scriptID, level);
	}

	set primaryModColor(modColorIndex: number) {
		SetVehicleModColor_1(this.scriptID, modColorIndex, 0, 0);
	}

	set secondaryModColor(modColorIndex: number) {
		SetVehicleModColor_2(this.scriptID, modColorIndex, 0);
	}

	get dashboardColor() {
		return GetVehicleDashboardColor(this.scriptID);
	}

	set dashboardColor(colorIndex: number) {
		SetVehicleDashboardColor(this.scriptID, colorIndex);
	}

	get tyreSmokeEnabled() {
		return IsToggleModOn(this.scriptID, 20);
	}

	set tyreSmokeEnabled(state: boolean) {
		ToggleVehicleMod(this.scriptID, 20, state);
	}

	get interiorColor() {
		return GetVehicleInteriorColor(this.scriptID);
	}

	set interiorColor(colorIndex: number) {
		SetVehicleInteriorColor(this.scriptID, colorIndex);
	}

	get hasModKit() {
		return GetVehicleModKit(this.scriptID) !== 0;
	}

	get xenonEnabled() {
		return !!IsToggleModOn(this.scriptID, 22);
	}

	set xenonEnabled(state: boolean) {
		ToggleVehicleMod(this.scriptID, 22, state);
	}

	installModKit() {
		SetVehicleModKit(this.scriptID, 0);
	}

	setMod(modType: number, modIndex: number) {
		SetVehicleMod(this.scriptID, modType, modIndex, false);
	}

	getMod(modType: number) {
		return GetVehicleMod(this.scriptID, modType);
	}
}
