import { AbstractService } from './abstractService';
import { Accommodation } from '../shared/model/accommodation';
import { AccommodationFilterParams } from '../views/shared-view/accommodations-view/accommodation-filter/AccommodationFilterParams';
import { AxiosResponse } from 'axios';
import axios from 'axios';
export class AccommodationService extends AbstractService<Accommodation> {
    constructor() {
        super('http://localhost:8080/api/accommodation');
    }

    filterAll(params: AccommodationFilterParams): Promise<AxiosResponse<Accommodation[]>> {
        return axios.post(this.url + '/filter', params);
    }
}

export const accommodationService = new AccommodationService();
