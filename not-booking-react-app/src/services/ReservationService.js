import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8082/api/reservation/',
    GET_BY_USER_ID: 'getByUserId/',
    DELETE_REQUEST: 'cancelReservation/',
};

class ReservationService {
    deleteReservation = async (id) => {
        try {
            return await axios.put(ENDPOINTS.BASE + ENDPOINTS.DELETE_REQUEST + id);
        } catch (error) {
            return error;
        }
    };
    getListRequestByGostId = async (id) => {
        try {
            return await axios.get(ENDPOINTS.BASE + ENDPOINTS.GET_BY_USER_ID + id);
        } catch (error) {
            return error;
        }
    };
}

const reservationService = new ReservationService();
export default reservationService;
