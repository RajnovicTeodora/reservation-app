export class DefaultModel {
    id: string;
    deleted: boolean;

    constructor(id: string, deleted: boolean) {
        this.id = id;
        this.deleted = deleted;
    }
}
