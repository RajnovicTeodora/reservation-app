export class AccommodationFilterParams {
    country: string;
    city: string;
    address: string;
    guests: string;
    fromDate: string;
    toDate: string;

    constructor() {
        this.country = '';
        this.city = '';
        this.address = '';
        this.guests = '';
        this.fromDate = '';
        this.toDate = '';
    }
}
