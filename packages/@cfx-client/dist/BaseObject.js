export class BaseObject {
    static entities = new Map();
    static getByID(id) {
        return this.entities.get(id);
    }
    static get all() {
        return Array.from(this.entities.values());
    }
    static get count() {
        return this.entities.size;
    }
    static idCounter = 0;
    _id;
    constructor() {
        this._id = BaseObject.idCounter++;
        BaseObject.entities.set(this.id, this);
    }
    get id() {
        return this._id;
    }
    cast(type) {
        return this instanceof type;
    }
    destroy() {
        BaseObject.entities.delete(this.id);
    }
}
