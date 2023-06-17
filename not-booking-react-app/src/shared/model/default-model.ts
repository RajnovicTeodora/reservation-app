export class DefaultModel {
    id: number;
    deleted: boolean;

    constructor(id: number, deleted: boolean) {
        this.id = id;
        this.deleted = deleted;
    }
}
