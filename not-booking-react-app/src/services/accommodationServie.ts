import { AbstractService } from './abstractService';
import { Accommodation } from '../shared/model/accommodation';

export class AccommodationService extends AbstractService<Accommodation> {
    constructor() {
        super('http://localhost:8080/api/accommodation');
    }
}

export const accommodationService = new AccommodationService();
