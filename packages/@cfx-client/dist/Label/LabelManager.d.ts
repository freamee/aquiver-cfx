import { Vector3 } from '@aquiver-cfx/shared';
import { Label } from './Label';
export declare class LabelsManager {
    new(...args: ConstructorParameters<typeof Label>): Label;
    at(id: number): Label | undefined;
    get all(): Label[];
    get streamed(): Label[];
    destroyAll(): void;
    findInRange(position: Vector3, range: number): Label[];
}
