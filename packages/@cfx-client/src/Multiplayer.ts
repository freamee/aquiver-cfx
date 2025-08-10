import { AreaBlip, Blip, PointBlip, RadiusBlip } from './Blip';
import { BlipsManager } from './Blip/BlipsManager';
import { Label, LabelRenderer, LabelsManager } from './Label';
import { Marker, MarkerRenderer, MarkersManager } from './Marker';

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

	constructor() {
		this.markers = new MarkersManager();
		this.labels = new LabelsManager();
		this.blips = new BlipsManager();

		new MarkerRenderer();
		new LabelRenderer();
	}
}
