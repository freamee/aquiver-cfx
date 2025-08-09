import _ from 'lodash';

export class RGBA {
	static readonly red: RGBA = new RGBA(255, 0, 0);
	static readonly green: RGBA = new RGBA(0, 255, 0);
	static readonly blue: RGBA = new RGBA(0, 0, 255);
	static readonly black: RGBA = new RGBA(0, 0, 0);
	static readonly white: RGBA = new RGBA(255, 255, 255);
	static readonly clear: RGBA = new RGBA(0, 0, 0, 0);

	public r: number;
	public g: number;
	public b: number;
	public a: number;

	constructor(r: number, g: number, b: number, a: number = 255) {
		/** Need to clamp the values between */
		this.r = _.clamp(r, 0, 255);
		this.g = _.clamp(g, 0, 255);
		this.b = _.clamp(b, 0, 255);
		this.a = _.clamp(a, 0, 255);
	}

	/**
	 * Visszaadja az RGBA értékeket tömbként.
	 * @returns [r, g, b, a]
	 */
	toArray(): [number, number, number, number] {
		return [this.r, this.g, this.b, this.a];
	}

	toArrayRGB(): [number, number, number] {
		return [this.r, this.g, this.b];
	}

	/**
	 * Visszaadja az RGBA-t BGRA formátumban.
	 * @returns BGRA formátumú RGBA objektum.
	 */
	toBGRA(): RGBA {
		return new RGBA(this.b, this.g, this.r, this.a);
	}

	/**
	 * Visszaadja az RGBA-t ARGB formátumban.
	 * @returns ARGB formátumú RGBA objektum.
	 */
	toARGB(): RGBA {
		return new RGBA(this.a, this.r, this.g, this.b);
	}

	/**
	 * Visszaadja az RGBA-t egész számként (32 bites ARGB formátumban).
	 * @returns Egész számként reprezentált szín.
	 */
	toInt(): number {
		return ((this.a << 24) | (this.r << 16) | (this.g << 8) | this.b) >>> 0;
	}

	/**
	 * Visszaadja az RGBA-t stringként.
	 * @returns "rgba(r, g, b, a)" formátumú string.
	 */
	toString(): string {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	}
}
