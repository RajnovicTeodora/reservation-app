import axios from 'axios';
const ENDPOINTS = {
    BASE: 'http://localhost:8081/api/host/',
    ADD_HOST: 'addHost/',
};

class HostService {
    addHost = (username) => {
        return axios.post(ENDPOINTS.BASE + ENDPOINTS.ADD_HOST + username);
    };
}

const hostService = new HostService();
export default hostService;
