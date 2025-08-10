import { Label, LabelRenderer, LabelsManager } from './Label';
import { Marker, MarkerRenderer, MarkersManager } from './Marker';

export class MultiplayerManager {
	public readonly markers: MarkersManager;
	public readonly Marker = Marker;

	public readonly labels: LabelsManager;
	public readonly TextLabel = Label;

	constructor() {
		this.markers = new MarkersManager();
		this.labels = new LabelsManager();

		new MarkerRenderer();
		new LabelRenderer();
	}
}
