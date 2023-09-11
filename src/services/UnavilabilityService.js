import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8081/api/unavilability/',
    ADD_UNAVILABILITY: 'addUnavilability',
    GET_LIST_UNAVILABILITIES_BY_ACCOMODATION_iD: 'getListUnavilabilitiesForAccomodation/',
};

class UnavilabilityService {
    createUnavilability = async (newUnavilability) => {
        try {
            const response = await axios.post(
                ENDPOINTS.BASE + ENDPOINTS.ADD_UNAVILABILITY,
                newUnavilability
            );
            return response;
        } catch (error) {
            return error;
        }
    };
    getListUnavilabilityByAccomodationId = async () => {
        try {
            return await axios.get(
                ENDPOINTS.BASE +
                    ENDPOINTS.GET_LIST_UNAVILABILITIES_BY_ACCOMODATION_iD +
                    localStorage.accommodationId
            );
        } catch (error) {
            return error;
        }
    };
}

const unavilabilityService = new UnavilabilityService();
export default unavilabilityService;
