import { RGBA, Vector2, Vector3 } from '@aquiver-cfx/shared';
import { GameplayCamera } from './GameplayCamera';

type ClickpointOptions = {
	sprite: [string, string];
	text: string;
};

export abstract class Graphics {
	static textSize: number = 0.25;
	static textScaleWithDistance: boolean = false;
	static textOutline: boolean = true;
	static textShadow: boolean = true;

	static drawRectangleBar3D(
		position: Vector3,
		percentage: number,
		width: number = 0.03,
		height: number = 0.0065,
		border: number = 0.001,
		color: RGBA = RGBA.white,
		text: string = ''
	) {
		const { result, screenPosition } = this.getScreenFromWorld(position);
		if (!result) return;

		this.drawRectangleBar2D(screenPosition, percentage, width, height, border, color, text);
	}

	/**
	 *
	 * @param position
	 * @param percentage
	 * @param width default: 0.03
	 * @param height default: 0.0065
	 * @param border default: 0.001
	 * @param color
	 */
	static drawRectangleBar2D(
		position: Vector2,
		percentage: number,
		width: number = 0.03,
		height: number = 0.0065,
		border: number = 0.001,
		color: RGBA = RGBA.white,
		text: string = ''
	) {
		const aspectRatio = GetScreenAspectRatio(false);

		const { x, y } = position;
		const [r, g, b, a] = color.toArray();

		width = width / aspectRatio;

		// Border
		DrawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);

		// Background
		DrawRect(x, y, width, height, 15, 15, 15, 200);

		// Content
		DrawRect(
			x - (width / 2) * (1 - percentage / 100),
			y,
			(width * percentage) / 100,
			height,
			r,
			g,
			b,
			a
		);

		if (text.length > 0) {
			this.drawTextThisFrame2D(new Vector2(x, y - height + (border * 2) / 2), text, 0.2);
		}
	}

	static drawRectangleBar3DVertical(
		position: Vector3,
		percentage: number,
		width: number = 0.05,
		height: number = 0.0045,
		border: number = 0.001,
		color: RGBA = RGBA.white
	) {
		const { result, screenPosition } = this.getScreenFromWorld(position);
		if (!result) return;

		this.drawRectangleBar2DVertical(screenPosition, percentage, width, height, border, color);
	}

	static drawRectangleBar2DVertical(
		position: Vector2,
		percentage: number,
		width: number = 0.0045,
		height: number = 0.05,
		border: number = 0.001,
		color: RGBA = RGBA.white
	) {
		const { x, y } = position;
		const [r, g, b, a] = color.toArray();

		// Border
		DrawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);

		// Background
		DrawRect(x, y, width, height, 15, 15, 15, 200);

		// Content
		DrawRect(
			x,
			y + (height * (1 - percentage / 100)) / 2,
			width,
			(height * percentage) / 100,
			r,
			g,
			b,
			a
		);
	}

	static drawTextThisFrame2D(
		position: Vector2,
		text: string,
		scale?: number,
		color: RGBA = RGBA.white,
		center: boolean = true
	) {
		if (typeof scale !== 'number') scale = this.textSize;

		const [r, g, b, a] = color.toArray();

		SetTextScale(0.0, scale);
		SetTextProportional(true);
		SetTextColour(r, g, b, a);
		SetTextCentre(center);

		if (this.textOutline) SetTextOutline();
		if (this.textShadow) SetTextDropShadow();

		BeginTextCommandDisplayText('STRING');
		AddTextComponentSubstringPlayerName(text);
		EndTextCommandDisplayText(position.x, position.y);
	}

	static drawTextThisFrame3D(
		position: Vector3,
		text: string,
		scale?: number,
		color: RGBA = RGBA.white,
		center: boolean = true
	) {
		if (typeof scale !== 'number') scale = this.textSize;

		const [r, g, b, a] = color.toArray();

		if (this.textScaleWithDistance) {
			const camPos = GameplayCamera.position;

			const distance = camPos.distanceTo(position);

			scale = (scale / distance) * 5;
			scale = Math.min(Math.max(scale, 0.15), 1);
		}

		SetTextScale(0.0, scale);
		SetTextProportional(true);
		SetTextColour(r, g, b, a);
		SetTextCentre(center);

		if (this.textOutline) SetTextOutline();
		if (this.textShadow) SetTextDropShadow();

		BeginTextCommandDisplayText('STRING');
		AddTextComponentSubstringPlayerName(text);
		SetDrawOrigin(position.x, position.y, position.z, 0);
		EndTextCommandDisplayText(0.0, 0.0);
		ClearDrawOrigin();
	}

	private static getLineCountAndMaxLength(text: string) {
		let count = 0;
		let maxLength = 0;

		const lines = text.split(/\n|~n~/);
		for (const line of lines) {
			count++;
			const length = line.length;
			if (length > maxLength) {
				maxLength = length;
			}
		}

		return { count, maxLength };
	}

	static drawTextWithBg3D(position: Vector3, text: string) {
		const { result, screenPosition } = this.getScreenFromWorld(position);
		if (!result) return;

		this.drawTextWithBg2D(screenPosition, text);
	}

	static drawTextWithBg2D(position: Vector2, text: string) {
		const { count, maxLength } = this.getLineCountAndMaxLength(text);

		const padding = 0.005;
		const heightFactor = count / 43 + padding / 2;
		const widthFactor = maxLength / 100 + padding;
		const height = heightFactor / 2 - padding / 2;
		const width = widthFactor / 2 - padding / 2;

		this.drawTextThisFrame2D(position, text);

		DrawRect(position.x, position.y + height, width, heightFactor, 0, 0, 0, 155);
	}

	static drawMarker(
		type: number,
		position: Vector3,
		scale: number | Vector3 = 0.25,
		color: RGBA = RGBA.white,
		rotation: Vector3 = new Vector3(),
		direction: Vector3 = new Vector3(),
		bobUpAndDown: boolean = false,
		faceCamera: boolean = false,
		rotate: boolean = true
	) {
		const scaleX = typeof scale === 'number' ? scale : scale.x;
		const scaleY = typeof scale === 'number' ? scale : scale.y;
		const scaleZ = typeof scale === 'number' ? scale : scale.z;

		DrawMarker(
			type,
			position.x,
			position.y,
			position.z,
			direction.x,
			direction.y,
			direction.z,
			rotation.x,
			rotation.y,
			rotation.z,
			scaleX,
			scaleY,
			scaleZ,
			color.r,
			color.g,
			color.b,
			color.a,
			bobUpAndDown,
			faceCamera,
			2,
			rotate,
			//@ts-ignore
			null,
			null,
			false
		);
	}

	static drawRect(position: Vector2, width: number, height: number, color: RGBA = RGBA.black) {
		const aspectRatio = GetScreenAspectRatio(false);

		width = width / aspectRatio;

		DrawRect(position.x, position.y, width, height, color.r, color.g, color.b, color.a);
	}

	static drawSprite3D(
		textureDict: string,
		textureName: string,
		position: Vector3,
		scale: number = 1.0,
		color: RGBA = RGBA.white
	) {
		const [result, x, y] = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);

		if (!result) return;

		const [cX, cY, cZ] = GetFinalRenderedCamCoord();
		const camPos = new Vector3(cX, cY, cZ);

		const distance = camPos.distanceTo(position);

		scale = (scale / distance) * 5;
		scale = Math.min(Math.max(scale, 0.15), 3.5);

		this.drawSprite(textureDict, textureName, new Vector2(x, y), scale, color);
	}

	static drawSprite(
		textureDict: string,
		textureName: string,
		position: Vector2,
		scale: number = 1.0,
		color: RGBA = RGBA.white
	) {
		const [tX, tY] = GetTextureResolution(textureDict, textureName) as [number, number];
		const [resolutionX, resolutionY] = GetScreenActiveResolution();
		const baseSize = 32;

		const scaleWidth = (baseSize / tX) * scale;
		const scaleHeight = (baseSize / tY) * scale;

		const screenScaleWidth = scaleWidth * (tX / resolutionX);
		const screenScaleHeight = scaleHeight * (tY / resolutionY);

		if (HasStreamedTextureDictLoaded(textureDict)) {
			DrawSprite(
				textureDict,
				textureName,
				position.x,
				position.y,
				screenScaleWidth,
				screenScaleHeight,
				0,
				color.r,
				color.g,
				color.b,
				color.a
			);
		} else {
			RequestStreamedTextureDict(textureDict, true);
		}
	}

	static drawClickPoint3D(
		position: Vector3,
		scale: number = 0.02,
		onClick: () => void,
		options: Partial<ClickpointOptions> = {}
	) {
		const { result, screenPosition } = this.getScreenFromWorld(position);
		if (!result) return;

		this.drawClickPoint2D(screenPosition, scale, onClick, options);
	}

	static drawClickPoint2D(
		position: Vector2,
		scale: number = 0.02,
		onClick: () => void,
		options: Partial<ClickpointOptions> = {}
	) {
		const aspectRatio = GetScreenAspectRatio(false);
		const width = scale / aspectRatio;
		const height = scale;

		const [cursorXpx, cursorYpx] = GetNuiCursorPosition();
		const [resX, resY] = GetActiveScreenResolution();

		// Pixel → normalizált 0.0–1.0
		const cursorX = cursorXpx / resX;
		const cursorY = cursorYpx / resY;

		const isHover =
			cursorX >= position.x - width / 2 &&
			cursorX <= position.x + width / 2 &&
			cursorY >= position.y - height / 2 &&
			cursorY <= position.y + height / 2;

		const drawColor = isHover ? new RGBA(35, 35, 35, 225) : new RGBA(25, 25, 25, 225);

		DrawRect(
			position.x,
			position.y,
			width,
			height,
			drawColor.r,
			drawColor.g,
			drawColor.b,
			drawColor.a
		);

		if (options.sprite) {
			const [dictionary, name] = options.sprite;

			this.drawSprite(dictionary, name, new Vector2(screenX, screenY), 0.55);
		}

		if (isHover) {
			if (options.text) {
				this.drawTextThisFrame2D(new Vector2(cursorX, cursorY), options.text);
			}

			if (IsDisabledControlJustPressed(0, 24)) {
				onClick();
			}
		}
	}

	/** Returns the screen coords. (0.0 <-> 1.0) */
	static getScreenFromWorld(position: Vector3) {
		const [result, x, y] = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);

		return {
			result,
			x,
			y,
			screenPosition: new Vector2(x, y)
		};
	}
}
