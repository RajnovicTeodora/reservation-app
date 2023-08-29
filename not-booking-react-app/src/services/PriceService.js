import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8082/api/price/',
    ADD_PRICE: 'addPrice',
    GET_LIST_PRICES_BY_ACCOMODATION_iD: 'getListPricesForAccomodation/',
};

class PriceService {
    createPrice = async (newPrice) => {
        try {
            return await axios.post(ENDPOINTS.BASE + ENDPOINTS.ADD_PRICE, newPrice);
        } catch (error) {
            return error;
        }
    };
    getListPricesByAccomodationId = async () => {
        try {
            return await axios.get(
                ENDPOINTS.BASE +
                    ENDPOINTS.GET_LIST_PRICES_BY_ACCOMODATION_iD +
                    localStorage.accommodationId
            );
        } catch (error) {
            return error;
        }
    };
}

const priceService = new PriceService();
export default priceService;
