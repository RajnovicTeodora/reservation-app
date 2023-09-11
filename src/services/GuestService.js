import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8081/api/guest/',
    ADD_GUEST: 'addGuest/',
};

class GuestService {
    addGuest = (username) => {
        return axios.post(ENDPOINTS.BASE + ENDPOINTS.ADD_GUEST + username);
    };
}

const guestService = new GuestService();
export default guestService;
