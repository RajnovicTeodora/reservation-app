import { DefaultModel } from './default-model';

export class Address extends DefaultModel {
    street: string;
    city: string;
    // state: string;
    // postalCode: string;
    number: string;

    constructor(
        id: string,
        deleted: boolean,
        street: string,
        city: string,
        // state: string,
        // postalCode: string,
        number: string
    ) {
        super(id, deleted);
        this.street = street;
        this.city = city;
        // this.state = state;
        // this.postalCode = postalCode;
        this.number = number;
    }
}
