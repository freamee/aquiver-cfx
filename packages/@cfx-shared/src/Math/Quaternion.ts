import { Vector3 } from './Vector3';

export class Quaternion {
	x: number;
	y: number;
	z: number;
	w: number;

	constructor(x = 0, y = 0, z = 0, w = 1) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	set(x: number, y: number, z: number, w: number): this {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		return this;
	}

	clone(): Quaternion {
		return new Quaternion(this.x, this.y, this.z, this.w);
	}

	copy(q: Quaternion): this {
		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;
		return this;
	}

	setFromAxisAngle(axis: Vector3, angle: number): this {
		const halfAngle = angle / 2;
		const s = Math.sin(halfAngle);
		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos(halfAngle);
		return this;
	}

	multiply(q: Quaternion): this {
		const x = this.x,
			y = this.y,
			z = this.z,
			w = this.w;
		const qx = q.x,
			qy = q.y,
			qz = q.z,
			qw = q.w;

		this.x = x * qw + w * qx + y * qz - z * qy;
		this.y = y * qw + w * qy + z * qx - x * qz;
		this.z = z * qw + w * qz + x * qy - y * qx;
		this.w = w * qw - x * qx - y * qy - z * qz;
		return this;
	}

	multiplyQuaternions(a: Quaternion, b: Quaternion): this {
		const ax = a.x,
			ay = a.y,
			az = a.z,
			aw = a.w;
		const bx = b.x,
			by = b.y,
			bz = b.z,
			bw = b.w;

		this.x = ax * bw + aw * bx + ay * bz - az * by;
		this.y = ay * bw + aw * by + az * bx - ax * bz;
		this.z = az * bw + aw * bz + ax * by - ay * bx;
		this.w = aw * bw - ax * bx - ay * by - az * bz;
		return this;
	}

	normalize(): this {
		let l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
		if (l === 0) {
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;
		} else {
			l = 1 / l;
			this.x *= l;
			this.y *= l;
			this.z *= l;
			this.w *= l;
		}
		return this;
	}

	inverse(): this {
		this.conjugate().normalize();
		return this;
	}

	conjugate(): this {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
		return this;
	}

	dot(q: Quaternion): number {
		return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
	}

	equals(q: Quaternion): boolean {
		return q.x === this.x && q.y === this.y && q.z === this.z && q.w === this.w;
	}
}
