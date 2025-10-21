export abstract class Event {
	onRemote(name: string, callback: (playerSource: number, ...args: any[]) => void) {
		onNet(name, (...args: any[]) => {
			callback(source, ...args);
		});
	}
}
