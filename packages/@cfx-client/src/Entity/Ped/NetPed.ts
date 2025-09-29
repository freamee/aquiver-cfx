import { NetEntity } from '../NetEntity';

export class NetPed extends NetEntity {
	static getByScriptId(id: number) {
		return new NetPed(id);
	}

	static getByNetId(id: number) {
		const entity = NetworkGetEntityFromNetworkId(id);

		return this.getByScriptId(entity);
	}

	protected _stateBag: StateBagInterface;

	private readonly _scriptID: number;

	constructor(scriptID: number) {
		super();

		this._scriptID = scriptID;

		this._stateBag = Entity(scriptID).state;
	}

	taskPlayAnim(
		dictionary: string,
		animationName: string,
		blendInSpeed: number,
		blendOutSpeed: number,
		duration: number,
		flag: number
	) {
		TaskPlayAnim(
			this._scriptID,
			dictionary,
			animationName,
			blendInSpeed,
			blendOutSpeed,
			duration,
			flag,
			1.0,
			false,
			false,
			false
		);
	}

	stopAnimTask(dictionary: string, animationName: string) {
		StopAnimTask(this._scriptID, dictionary, animationName, 1.0);
	}

	get scriptID() {
		return this._scriptID;
	}
}
