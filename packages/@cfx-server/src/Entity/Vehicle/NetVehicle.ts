import _ from 'lodash';
import { NetEntity } from '../NetEntity';
import { Vector3 } from '@aquiver-cfx/shared';

export class NetVehicle extends NetEntity {
	static create(
		type: string,
		modelHash: string | number,
		position: Vector3,
		dimension: number = 0,
		rotation: Vector3 = new Vector3()
	) {
		const id = CreateVehicleServerSetter(
			modelHash,
			type,
			position.x,
			position.y,
			position.z,
			rotation.z
		);

		SetEntityRoutingBucket(id, dimension);

		SetEntityOrphanMode(id, 2);

		return new NetVehicle(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return this.getByScriptId(entity);
	}

	static getByScriptId(id: number) {
		return new NetVehicle(id);
	}

	protected _stateBag: StateBagInterface;

	constructor(private _scriptID: number) {
		super();

		this._stateBag = Entity(this._scriptID).state;
	}

	get scriptID(): number {
		return this._scriptID;
	}

	get modelHash() {
		return GetEntityModel(this._scriptID);
	}

	get numberPlate() {
		return GetVehicleNumberPlateText(this._scriptID);
	}

	get bodyHealth() {
		return GetVehicleBodyHealth(this.scriptID);
	}

	set bodyHealth(health: number) {
		SetVehicleBodyHealth(this._scriptID, health);
	}

	get engineHealth() {
		return GetVehicleEngineHealth(this.scriptID);
	}

	get driver() {
		const id = GetPedInVehicleSeat(this.scriptID, -1);

		return id;
	}

	get velocity() {
		const [x, y, z] = GetEntityVelocity(this.scriptID);

		return new Vector3(x, y, z);
	}

	get handbrakeOn() {
		return GetVehicleHandbrake(this._scriptID);
	}

	get engineOn() {
		return !!GetIsVehicleEngineRunning(this.scriptID);
	}

	get dirtLevel() {
		return GetVehicleDirtLevel(this._scriptID);
	}

	set dirtLevel(level: number) {
		level = _.clamp(level, 0.0, 15.0);

		SetVehicleDirtLevel(this._scriptID, level);
	}

	get speed() {
		const velocity = this.velocity;

		return Math.abs(
			Math.floor(
				Math.sqrt(
					velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z
				) * 3.6
			)
		);
	}

	get dimension(): number {
		return GetEntityRoutingBucket(this._scriptID);
	}

	set dimension(dimension: number) {
		super.dimension = dimension;

		SetEntityRoutingBucket(this._scriptID, dimension);
	}
}
