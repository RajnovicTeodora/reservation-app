import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8080/api/request/',
    CREATE_REQUEST: 'addRequest',
    GET_BY_USER_ID: 'getByUserId/',
    DELETE_REQUEST: 'deleteRequest/',
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
}

const requestService = new RequestService();
export default requestService;
