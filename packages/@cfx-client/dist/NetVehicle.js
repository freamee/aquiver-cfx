import { NetEntity } from './NetEntity';
export class NetVehicle extends NetEntity {
    _scriptID;
    static getByScriptId(id) {
        return new NetVehicle(id);
    }
    static getByNetId(id) {
        const entity = NetworkGetEntityFromNetworkId(id);
        return new NetVehicle(entity);
    }
    _stateBag;
    constructor(_scriptID) {
        super();
        this._scriptID = _scriptID;
        this._stateBag = Entity(this.scriptID).state;
    }
    get scriptID() {
        return this._scriptID;
    }
    get trailer() {
        const [_, id] = GetVehicleTrailerVehicle(this.scriptID);
        return NetVehicle.getByScriptId(id);
    }
    get steeringAngle() {
        return GetVehicleSteeringAngle(this.scriptID);
    }
    set steeringAngle(angle) {
        SetVehicleSteeringAngle(this.scriptID, angle);
    }
    get engineTemperature() {
        return GetVehicleEngineTemperature(this.scriptID);
    }
    set engineTemperature(temperature) {
        SetVehicleEngineTemperature(this.scriptID, temperature);
    }
    get alarmState() {
        return !!IsVehicleAlarmActivated(this.scriptID);
    }
    set alarmState(state) {
        SetVehicleAlarm(this.scriptID, state);
    }
    get isVehicleRadioOn() {
        return !!IsVehicleRadioOn(this.scriptID);
    }
    get isRadioEnabled() {
        return !!IsVehicleRadioEnabled(this.scriptID);
    }
    set isRadioEnabled(state) {
        SetVehicleRadioEnabled(this.scriptID, state);
    }
    get lockState() {
        return GetVehicleDoorLockStatus(this.scriptID);
    }
    set lockState(lockStatus) {
        SetVehicleDoorsLocked(this.scriptID, lockStatus);
    }
    get classType() {
        return GetVehicleClass(this.scriptID);
    }
    get handbrakeOn() {
        return !!GetVehicleHandbrake(this.scriptID);
    }
    set handbrakeOn(state) {
        SetVehicleHandbrake(this.scriptID, state);
    }
    get engineOn() {
        return !!IsVehicleEngineOn(this.scriptID);
    }
    set engineOn(state) {
        SetVehicleEngineOn(this.scriptID, state, true, true);
    }
    isSeatFree(seatIndex) {
        return !!IsVehicleSeatFree(this.scriptID, seatIndex);
    }
    set indicatorLeft(state) {
        SetVehicleIndicatorLights(this.scriptID, 1, state);
    }
    get indicatorLeft() {
        const state = GetVehicleIndicatorLights(this.scriptID);
        return [1, 3].includes(state);
    }
    set indicatorRight(state) {
        SetVehicleIndicatorLights(this.scriptID, 0, state);
    }
    get indicatorRight() {
        const state = GetVehicleIndicatorLights(this.scriptID);
        return [2, 3].includes(state);
    }
    get currentGear() {
        return GetVehicleCurrentGear(this.scriptID);
    }
    set currentGear(gear) {
        SetVehicleCurrentGear(this.scriptID, gear);
    }
    get rpm() {
        return GetVehicleCurrentRpm(this.scriptID);
    }
    set rpm(count) {
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
    get bodyHealth() {
        return GetVehicleBodyHealth(this.scriptID);
    }
    set bodyHealth(hp) {
        SetVehicleBodyHealth(this.scriptID, hp);
    }
    get engineHealth() {
        return GetVehicleEngineHealth(this.scriptID);
    }
    set engineHealth(hp) {
        SetVehicleEngineHealth(this.scriptID, hp);
    }
    get petrolTankHealth() {
        return GetVehiclePetrolTankHealth(this.scriptID);
    }
    set petrolTankHealth(hp) {
        SetVehiclePetrolTankHealth(this.scriptID, hp);
    }
    get numberPlate() {
        return GetVehicleNumberPlateText(this.scriptID);
    }
    set numberPlate(text) {
        SetVehicleNumberPlateText(this.scriptID, text.substring(0, 8));
    }
    get dirtLevel() {
        return GetVehicleDirtLevel(this.scriptID);
    }
    set dirtLevel(level) {
        SetVehicleDirtLevel(this.scriptID, level);
    }
    set primaryModColor(modColorIndex) {
        SetVehicleModColor_1(this.scriptID, modColorIndex, 0, 0);
    }
    set secondaryModColor(modColorIndex) {
        SetVehicleModColor_2(this.scriptID, modColorIndex, 0);
    }
    get dashboardColor() {
        return GetVehicleDashboardColor(this.scriptID);
    }
    set dashboardColor(colorIndex) {
        SetVehicleDashboardColor(this.scriptID, colorIndex);
    }
    get tyreSmokeEnabled() {
        return IsToggleModOn(this.scriptID, 20);
    }
    set tyreSmokeEnabled(state) {
        ToggleVehicleMod(this.scriptID, 20, state);
    }
    get interiorColor() {
        return GetVehicleInteriorColor(this.scriptID);
    }
    set interiorColor(colorIndex) {
        SetVehicleInteriorColor(this.scriptID, colorIndex);
    }
    get hasModKit() {
        return GetVehicleModKit(this.scriptID) !== 0;
    }
    get xenonEnabled() {
        return !!IsToggleModOn(this.scriptID, 22);
    }
    set xenonEnabled(state) {
        ToggleVehicleMod(this.scriptID, 22, state);
    }
    installModKit() {
        SetVehicleModKit(this.scriptID, 0);
    }
    setMod(modType, modIndex) {
        SetVehicleMod(this.scriptID, modType, modIndex, false);
    }
    getMod(modType) {
        return GetVehicleMod(this.scriptID, modType);
    }
}
