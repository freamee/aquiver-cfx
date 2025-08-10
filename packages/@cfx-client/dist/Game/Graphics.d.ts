import { RGBA, Vector2, Vector3 } from '@aquiver-cfx/shared';
export declare abstract class Graphics {
    static drawRectangleBar3D(position: Vector3, percentage: number, width?: number, height?: number, border?: number, color?: RGBA, text?: string): void;
    /**
     *
     * @param position
     * @param percentage
     * @param width default: 0.03
     * @param height default: 0.0065
     * @param border default: 0.001
     * @param color
     */
    static drawRectangleBar2D(position: Vector2, percentage: number, width?: number, height?: number, border?: number, color?: RGBA, text?: string): void;
    static drawRectangleBar3DVertical(position: Vector3, percentage: number, width?: number, height?: number, border?: number, color?: RGBA): void;
    static drawRectangleBar2DVertical(position: Vector2, percentage: number, width?: number, height?: number, border?: number, color?: RGBA): void;
    static drawTextThisFrame2D(position: Vector2, text: string, scale?: number, color?: RGBA, center?: boolean): void;
    static drawTextThisFrame3D(position: Vector3, text: string, scale?: number, color?: RGBA, center?: boolean): void;
    private static getLineCountAndMaxLength;
    static drawTextWithBg3D(position: Vector3, text: string): void;
    static drawTextWithBg2D(position: Vector2, text: string): void;
    static drawMarker(type: number, position: Vector3, scale?: number | Vector3, color?: RGBA, rotation?: Vector3, direction?: Vector3, bobUpAndDown?: boolean, faceCamera?: boolean, rotate?: boolean): void;
    static drawRect(position: Vector2, width: number, height: number, color?: RGBA): void;
    static drawSprite3D(textureDict: string, textureName: string, position: Vector3, scale?: number, color?: RGBA): void;
    static drawSprite(textureDict: string, textureName: string, position: Vector2, scale?: number, color?: RGBA): void;
    /** Returns the screen coords. (0.0 <-> 1.0) */
    static getScreenFromWorld(position: Vector3): {
        result: boolean;
        x: number;
        y: number;
        screenPosition: Vector2;
    };
}
