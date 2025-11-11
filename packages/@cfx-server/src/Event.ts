export abstract class Event {
	static onRemote(name: string, callback: (playerSource: number, ...args: any[]) => void) {
		onNet(name, (...args: any[]) => {
			callback(source, ...args);
		});
	}
}
