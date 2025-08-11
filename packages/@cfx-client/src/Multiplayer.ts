import { Interval } from '@aquiver-cfx/shared';
import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { BlipsManager } from './Blip/BlipsManager';
import { Label, LabelRenderer, LabelsManager } from './Label';
import { Marker, MarkerRenderer, MarkersManager } from './Marker';
import { BaseObject, StreamingGroup } from './GameObject';
import { meta } from './Meta/Meta';
import { LocalPed, LocalProp, LocalVehicle, NetPlayer } from './Entity';
import { CheckpointsManager } from './Checkpoint/CheckpointsManager';
import { Checkpoint } from './Checkpoint/Checkpoint';
import { Sprite, SpriteRenderer, SpritesManager } from './Sprite';
import { syncedMeta } from './Meta/SyncedMeta';

export class MultiplayerManager {
	public readonly markers: MarkersManager;
	public readonly Marker = Marker;

	public readonly labels: LabelsManager;
	public readonly TextLabel = Label;

	public readonly blips: BlipsManager;
	public readonly Blip = Blip;
	public readonly PointBlip = PointBlip;
	public readonly AreaBlip = AreaBlip;
	public readonly RadiusBlip = RadiusBlip;

	public readonly checkpoints: CheckpointsManager;
	public readonly Checkpoint = Checkpoint;

	public readonly sprites: SpritesManager;
	public readonly Sprite = Sprite;

	getMetaEntries = meta.fromEntries.bind(meta);
	getMeta = meta.get.bind(meta);
	setMeta = meta.set.bind(meta);
	deleteMeta = meta.delete.bind(meta);
	hasMeta = meta.has.bind(meta);

	getSyncedMetaEntries = syncedMeta.fromEntries.bind(syncedMeta);
	getSyncedMeta = syncedMeta.get.bind(syncedMeta);
	setSyncedMeta = syncedMeta.set.bind(syncedMeta);
	deleteSyncedMeta = syncedMeta.delete.bind(syncedMeta);
	hasSyncedMeta = syncedMeta.has.bind(syncedMeta);

	constructor() {
		this.markers = new MarkersManager();
		this.labels = new LabelsManager();
		this.blips = new BlipsManager();
		this.checkpoints = new CheckpointsManager();
		this.sprites = new SpritesManager();

		new MarkerRenderer();
		new LabelRenderer();
		new SpriteRenderer();

		on('onResourceStop', this.onResourceStop.bind(this));
		on('onResourceStart', this.onResourceStart.bind(this));

		new Interval(
			() => {
				const local = NetPlayer.local;
				const pos = local.position;
				const dimension = local.dimension;

				for (const group of StreamingGroup.all) {
					group.update(pos, dimension);
				}
			},
			500,
			true,
			false
		);

		AddStateBagChangeHandler(
			'PLAYER_DIMENSION',
			'player:' + NetPlayer.local.source,
			(
				bagName: string,
				key: string,
				value: number,
				reserved: number,
				replicated: boolean
			) => {
				const local = NetPlayer.local;
				const pos = local.position;

				for (const group of StreamingGroup.all) {
					group.update(pos, value);
				}
			}
		);

		onNet('object:create', (data: any) => {
			console.log(data);
		});
		onNet('object:destroy', (id: number) => {
			const baseObject = BaseObject.getByRemoteId(id);
			if (baseObject) {
				baseObject.destroy();
			}
		});

		onNet('baseObject:setSyncedMeta', (id: number, key: string, value: any) => {
			const baseObject = BaseObject.getByRemoteId(id);
			if (baseObject) {
				baseObject.syncedMeta.set(key, value);
			}
		});
		onNet('baseObject:deleteSyncedMeta', (id: number, key: string) => {
			const baseObject = BaseObject.getByRemoteId(id);
			if (baseObject) {
				baseObject.syncedMeta.delete(key);
			}
		});
	}

	private onResourceStart(resourceName: string) {
		if (GetCurrentResourceName() !== resourceName) return;
	}

	private onResourceStop(resourceName: string) {
		if (GetCurrentResourceName() !== resourceName) return;

		const entities = [...LocalProp.all, ...LocalPed.all, ...LocalVehicle.all];

		for (const entity of entities) {
			entity.destroy();
		}

		console.log(`Destroyed ${entities.length} entity.`);
	}
}
