export function random(min: number, max: number): number {
	if (min > max) {
		const t = min;
		min = max;
		max = t;
	}

	return Math.floor(Math.random() * (max - min + 1)) + min;
}
