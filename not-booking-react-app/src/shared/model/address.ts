import { DefaultModel } from './default-model';

export class Address extends DefaultModel {
    street: string;
    city: string;
    // state: string;
    // postalCode: string;
    country: string;

    constructor(
        id: number,
        deleted: boolean,
        street: string,
        city: string,
        // state: string,
        // postalCode: string,
        country: string
    ) {
        super(id, deleted);
        this.street = street;
        this.city = city;
        // this.state = state;
        // this.postalCode = postalCode;
        this.country = country;
    }
}
