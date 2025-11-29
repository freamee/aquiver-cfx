const resourceName = GetCurrentResourceName();

export class DUI {
	private static idCounter: number = 0;

	private _id: number;
	private _dui: number;
	private _duiHandle: string;

	private _dictionaryName: string;
	private _textureName: string;

	constructor(url: string, width: number, height: number) {
		this._id = DUI.idCounter++;

		this._dui = CreateDui(url, width, height);
		this._duiHandle = GetDuiHandle(this._dui);

		this._dictionaryName = `dui_dictionary_${resourceName}_${this._id}`;
		this._textureName = `dui_texture_${resourceName}_${this._id}`;

		const txd = CreateRuntimeTxd(this._dictionaryName);
		const txdObject = CreateRuntimeTextureFromDuiHandle(
			txd,
			this._textureName,
			this._duiHandle
		);
	}

	get dictionaryName() {
		return this._dictionaryName;
	}

	get textureName() {
		return this._textureName;
	}

	setUrl(url: string) {
		SetDuiUrl(this._dui, url);
	}

	send(message: any) {
		SendDuiMessage(this._dui, JSON.stringify(message));
	}

	get isAvailable() {
		return IsDuiAvailable(this._dui);
	}
}
