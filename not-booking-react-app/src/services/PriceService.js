import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8080/api/price/',
    ADD_PRICE: 'addPrice',
    GET_LIST_PRICES_BY_ACCOMODATION_iD: 'getListPricesForAccomodation/'
}

class PriceService {
    
    createPrice = async (newPrice) => {
       
        try {
            const response = await axios.post(ENDPOINTS.BASE + ENDPOINTS.ADD_PRICE, newPrice);
            console.log(response);
            alert(response);
        } catch (error) {
            alert(error)
            console.error(error); 
        }
    }
    getListPricesByAccomodationId = async () => {
       
        try {
            const response = await axios.get(ENDPOINTS.BASE+ENDPOINTS.GET_LIST_PRICES_BY_ACCOMODATION_iD+"1");
            console.log(response);
            return response;
        } catch (error) {
            alert(error)
            console.error(error); 
        }
    }
}

const priceService = new PriceService();
export default priceService;
