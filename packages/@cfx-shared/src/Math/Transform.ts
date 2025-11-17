import { Vector3 } from './Vector3';

export class Transform {
	constructor(
		readonly x: number = 0,
		readonly y: number = 0,
		readonly z: number = 0,
		readonly rx: number = 0,
		readonly ry: number = 0,
		readonly rz: number = 0
	) {}

	get position(): Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}

	get rotation(): Vector3 {
		return new Vector3(this.rx, this.ry, this.rz);
	}
}
