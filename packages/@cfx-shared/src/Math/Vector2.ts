export class Vector2 {
	x: number;
	y: number;

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set(x: number, y: number): this {
		this.x = x;
		this.y = y;
		return this;
	}

	setScalar(scalar: number): this {
		this.x = scalar;
		this.y = scalar;
		return this;
	}

	clone(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	copy(v: Vector2): this {
		this.x = v.x;
		this.y = v.y;
		return this;
	}

	add(v: Vector2): this {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	addScalar(s: number): this {
		this.x += s;
		this.y += s;
		return this;
	}

	sub(v: Vector2): this {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	subScalar(s: number): this {
		this.x -= s;
		this.y -= s;
		return this;
	}

	multiply(v: Vector2): this {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}

	multiplyScalar(scalar: number): this {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	divide(v: Vector2): this {
		this.x /= v.x;
		this.y /= v.y;
		return this;
	}

	divideScalar(scalar: number): this {
		return this.multiplyScalar(1 / scalar);
	}

	lengthSq(): number {
		return this.x * this.x + this.y * this.y;
	}

	length(): number {
		return Math.sqrt(this.lengthSq());
	}

	normalize(): this {
		return this.divideScalar(this.length() || 1);
	}

	distanceTo(v: Vector2): number {
		return Math.sqrt(this.distanceToSquared(v));
	}

	distanceToSquared(v: Vector2): number {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return dx * dx + dy * dy;
	}

	negate(): this {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	dot(v: Vector2): number {
		return this.x * v.x + this.y * v.y;
	}

	equals(v: Vector2): boolean {
		return v.x === this.x && v.y === this.y;
	}
}
