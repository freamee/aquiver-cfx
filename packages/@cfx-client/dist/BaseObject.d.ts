export declare abstract class BaseObject {
    protected static entities: Map<number, BaseObject>;
    static getByID(id: number): BaseObject | undefined;
    static get all(): BaseObject[];
    static get count(): number;
    private static idCounter;
    private _id;
    constructor();
    get id(): number;
    cast<T extends BaseObject>(type: new (...args: any[]) => T): this is T;
    destroy(): void;
}
