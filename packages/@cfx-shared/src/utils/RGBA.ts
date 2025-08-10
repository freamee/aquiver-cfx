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
		this.r = _.clamp(r, 0, 255);
		this.g = _.clamp(g, 0, 255);
		this.b = _.clamp(b, 0, 255);
		this.a = _.clamp(a, 0, 255);
	}

	toArray(): [number, number, number, number] {
		return [this.r, this.g, this.b, this.a];
	}

	toArrayRGB(): [number, number, number] {
		return [this.r, this.g, this.b];
	}

	toBGRA(): RGBA {
		return new RGBA(this.b, this.g, this.r, this.a);
	}

	toARGB(): RGBA {
		return new RGBA(this.a, this.r, this.g, this.b);
	}

	toInt(): number {
		return ((this.a << 24) | (this.r << 16) | (this.g << 8) | this.b) >>> 0;
	}

	toString(): string {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	}
}
