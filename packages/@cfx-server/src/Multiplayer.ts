import { Interval } from '@aquiver-cfx/shared';
import { NetPlayer } from './Entity';
import { StreamingGroup } from './GameObject';

export class Multiplayer {
	private _resourceName: string = GetCurrentResourceName();

	constructor() {
		on('playerJoining', this.onPlayerJoin.bind(this));
		on('playerDropped', this.onPlayerDrop.bind(this));
		on('onServerResourceStart', this.onServerResourceStart.bind(this));

		new Interval(
			() => {
				for (const player of NetPlayer.all) {
					for (const group of StreamingGroup.all) {
						group.update(player);
					}
				}
			},
			500,
			true,
			false
		);
	}

	private onPlayerJoin() {
		if (NetPlayer.getBySource(source)) return;

		new NetPlayer(source);
	}

	private onPlayerDrop() {
		const player = NetPlayer.getBySource(source);
		if (player) {
			player.destroy();
		}
	}

	private onServerResourceStart(resourceName: string) {
		if (this._resourceName !== resourceName) return;

		const players = getPlayers();

		console.log('Found online players count: ' + players.length);

		for (const playerSrc of players) {
			if (NetPlayer.getBySource(playerSrc)) continue;

			new NetPlayer(playerSrc);
		}
	}
}
