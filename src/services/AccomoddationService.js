import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8081/api/accomodation/',
    CREATE_ACCOMODATION: 'addAccomodation',
    DELETE_ACCOMMODATIONS: 'deleteAccommodations/',
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
    deleteAccommodations = (username) => {
        return axios.get(ENDPOINTS.BASE + ENDPOINTS.DELETE_ACCOMMODATIONS + username);
    };
}

const accomoddationService = new AccomodationService();
export default accomoddationService;
