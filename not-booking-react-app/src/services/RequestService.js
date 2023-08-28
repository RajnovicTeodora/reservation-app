import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8082/api/request/',
    CREATE_REQUEST: 'addRequest',
    GET_BY_USER_ID: 'getByUserId/',
    DELETE_REQUEST: 'deleteRequest/',
    GET_BY_ACCOMODATION_ID: 'getRequestsByAccomodationId/',
    DECLINE_REQUEST: 'declineRequest/',
    APPROVE_REQUEST: 'approveRequest/',
};

class RequestService {
    createRequest = async (newRequest) => {
        try {
            await axios.post(ENDPOINTS.BASE + ENDPOINTS.CREATE_REQUEST, newRequest);
        } catch (error) {
            return error;
        }
    };

    deleteRequest = async (id) => {
        try {
            return await axios.delete(ENDPOINTS.BASE + ENDPOINTS.DELETE_REQUEST + id);
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
    getListRequestByAccomodationId = async (id) => {
        try {
            return await axios.get(ENDPOINTS.BASE + ENDPOINTS.GET_BY_ACCOMODATION_ID + id);
        } catch (error) {
            return error;
        }
    };
    approveRequest = async (id) => {
        try {
            return await axios.put(ENDPOINTS.BASE + ENDPOINTS.APPROVE_REQUEST + id);
        } catch (error) {
            return error;
        }
    };

    declineRequest = async (id) => {
        try {
            return await axios.put(ENDPOINTS.BASE + ENDPOINTS.DECLINE_REQUEST + id);
        } catch (error) {
            return error;
        }
    };
}

const requestService = new RequestService();
export default requestService;
