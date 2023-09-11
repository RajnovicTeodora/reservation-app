export class AccommodationFilterParams {
    country: string;
    city: string;
    address: string;
    guests: number;
    fromDate: string;
    toDate: string;

    constructor() {
        this.country = '';
        this.city = '';
        this.address = '';
        this.guests = 0;
        this.fromDate = '';
        this.toDate = '';
    }
}
