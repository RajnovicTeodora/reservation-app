import axios from 'axios';
const API_URL = 'http://localhost:8080/api/user/';

const login = (email, password) => {
    return axios
        .post(API_URL + 'login', {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.get(API_URL + 'logout');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const register = (
    username,
    password,
    name,
    surname,
    email,
    userRole,
    country,
    city,
    street,
    streetNum
) => {
    return axios.post(API_URL + 'register', {
        username,
        password,
        name,
        surname,
        email,
        userRole,
        country,
        city,
        street,
        streetNum,
    });
};

const authHeader = (withContentType) => {
    let token = JSON.parse(localStorage.getItem('user')).accessToken;
    if (withContentType) {
        return {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
        };
    } else {
        return {
            'X-Auth-Token': token,
        };
    }
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
    authHeader,
    register,
};

export default AuthService;
