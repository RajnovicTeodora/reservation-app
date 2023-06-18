import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8080/api/unavilability/',
    ADD_UNAVILABILITY: 'addUnavilability',
    GET_LIST_UNAVILABILITIES_BY_ACCOMODATION_iD: 'getListUnavilabilitiesForAccomodation/'
}

class UnavilabilityService {
    
    createUnavilability = async (newUnavilability) => {
       
        try {
            const response = await axios.post(ENDPOINTS.BASE + ENDPOINTS.ADD_UNAVILABILITY, newUnavilability);
            console.log(response);
            alert(response);
        } catch (error) {
            alert(error)
            console.error(error); 
        }
    }
    getListUnavilabilityByAccomodationId = async () => {
       
        try {
            const response = await axios.get(ENDPOINTS.BASE+ENDPOINTS.GET_LIST_UNAVILABILITIES_BY_ACCOMODATION_iD+"648ebee63073a2143b4f95bf");
            console.log(response);
            return response;
        } catch (error) {
            alert(error)
            console.error(error); 
        }
    }
}

const unavilabilityService = new UnavilabilityService();
export default unavilabilityService;
