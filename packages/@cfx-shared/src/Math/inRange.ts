export function inRange(value: number, start: number, end?: number): boolean {
	if (end === undefined) {
		end = start;
		start = 0;
	}

	if (start > end) {
		const temp = start;
		start = end;
		end = temp;
	}

	return value >= start && value < end;
}
