export class Vector3 {
	x: number;
	y: number;
	z: number;

	constructor(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	set(x: number, y: number, z: number): this {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	setScalar(scalar: number): this {
		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		return this;
	}

	setX(x: number): this {
		this.x = x;
		return this;
	}

	setY(y: number): this {
		this.y = y;
		return this;
	}

	setZ(z: number): this {
		this.z = z;
		return this;
	}

	clone(): Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}

	copy(v: Vector3): this {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}

	add(v: Vector3): this {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	addScalar(s: number): this {
		this.x += s;
		this.y += s;
		this.z += s;
		return this;
	}

	sub(v: Vector3): this {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	subScalar(s: number): this {
		this.x -= s;
		this.y -= s;
		this.z -= s;
		return this;
	}

	multiply(v: Vector3): this {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		return this;
	}

	multiplyScalar(scalar: number): this {
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	}

	divide(v: Vector3): this {
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;
		return this;
	}

	divideScalar(scalar: number): this {
		return this.multiplyScalar(1 / scalar);
	}

	min(v: Vector3): this {
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		this.z = Math.min(this.z, v.z);
		return this;
	}

	max(v: Vector3): this {
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		this.z = Math.max(this.z, v.z);
		return this;
	}

	clamp(min: Vector3, max: Vector3): this {
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));
		return this;
	}

	lengthSq(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	length(): number {
		return Math.sqrt(this.lengthSq());
	}

	normalize(): this {
		return this.divideScalar(this.length() || 1);
	}

	distanceTo(v: Vector3): number {
		return Math.sqrt(this.distanceToSquared(v));
	}

	distanceToSquared(v: Vector3): number {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		const dz = this.z - v.z;
		return dx * dx + dy * dy + dz * dz;
	}

	negate(): this {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}

	dot(v: Vector3): number {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	cross(v: Vector3): this {
		const x = this.x,
			y = this.y,
			z = this.z;
		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;
		return this;
	}

	crossVectors(a: Vector3, b: Vector3): this {
		const ax = a.x,
			ay = a.y,
			az = a.z;
		const bx = b.x,
			by = b.y,
			bz = b.z;
		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;
		return this;
	}

	equals(v: Vector3): boolean {
		return v.x === this.x && v.y === this.y && v.z === this.z;
	}
}
