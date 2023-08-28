import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8082/api/accomodation/',
    CREATE_ACCOMODATION: 'addAccomodation',
};

class AccomodationService {
    createAccomodation = async (newAccomodation) => {
        try {
            return await axios.post(
                ENDPOINTS.BASE + ENDPOINTS.CREATE_ACCOMODATION,
                newAccomodation
            );
        } catch (error) {
            return error;
        }
    };
}

const accomoddationService = new AccomodationService();
export default accomoddationService;
