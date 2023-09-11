import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8081/api/reservation/',
    GET_BY_USER_ID: 'getByUserId/',
    DELETE_REQUEST: 'cancelReservation',
    UPDATE_USERNAME: 'updateUsername/',
    CHECK_ACTIVE_RESERVATIONS: 'checkActiveReservations/',
    CHECK_FINISHED_RESERVATIONS: 'checkFinishedReservations/',
};

class ReservationService {
    deleteReservation = async (id) => {
        try {
            return await axios.put(ENDPOINTS.BASE + ENDPOINTS.DELETE_REQUEST, id);
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
    checkActiveReservations = (username, userType) => {
        return axios.get(
            ENDPOINTS.BASE + ENDPOINTS.CHECK_ACTIVE_RESERVATIONS + username + '/' + userType
        );
    };
    updateUsername = (oldUsername, newUsername, userType) => {
        return axios.get(
            ENDPOINTS.BASE +
                ENDPOINTS.UPDATE_USERNAME +
                oldUsername +
                '/' +
                newUsername +
                '/' +
                userType
        );
    };
    checkFinishedReservations = (hostUsername, guestUsername, accommodationId) => {
        return axios.get(
            ENDPOINTS.BASE +
                ENDPOINTS.CHECK_FINISHED_RESERVATIONS +
                hostUsername +
                '/' +
                guestUsername +
                '/' +
                accommodationId
        );
    };
}

const reservationService = new ReservationService();
export default reservationService;
