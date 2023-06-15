import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8080/api/accomodation/',
    CREATE_ACCOMODATION: 'addAccomodation',
}

class AccomodationService {
    
    createAccomodation = async (newAccomodation) => {
      try {
         const response = await axios.post(ENDPOINTS.BASE + ENDPOINTS.CREATE_ACCOMODATION, newAccomodation);
       } catch (error) {
         console.error(error); 
       }
    }
}

const accomoddationService = new AccomodationService();
export default accomoddationService;
