import axios from 'axios';
import AuthService from './auth.service';
const API_URL = 'http://localhost:8080/api/rating/';

const getAvgAccommodationScore = (accommodationId) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAvgAccommodationScore/' + accommodationId, {
        headers: headers,
    });
};

const getAvgHostScore = (hostmail) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAvgHostScore/' + hostmail, {
        headers: headers,
    });
};

const getAllAccommodationScores = (accommodationId) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAllAccommodationScores/' + accommodationId, {
        headers: headers,
    });
};

const getAllHostScores = (hostmail) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAllHostScores/' + hostmail, {
        headers: headers,
    });
};

const getExistingAccommodationScore = (accommodationId) => {
    const headers = AuthService.authHeader(false);
    let email = JSON.parse(localStorage.getItem('user')).email;
    return axios.get(API_URL + 'getExistingAccommodationScore/' + email + '/' + accommodationId, {
        headers: headers,
    });
};

const getExistingHostScore = (hostmail) => {
    const headers = AuthService.authHeader(false);
    let email = JSON.parse(localStorage.getItem('user')).email;
    return axios.get(API_URL + 'getExistingHostScore/' + email + '/' + hostmail, {
        headers: headers,
    });
};

const saveRating = (data) => {
    const headers = AuthService.authHeader(true);
    return axios.post(API_URL + 'saveRating/', data, {
        headers: headers,
    });
};

const deleteRating = (data) => {
    const headers = AuthService.authHeader(true);
    return axios.post(API_URL + 'deleteRating/', data, {
        headers: headers,
    });
};

const RatingService = {
    getAvgAccommodationScore,
    getAvgHostScore,
    getAllAccommodationScores,
    getAllHostScores,
    getExistingAccommodationScore,
    getExistingHostScore,
    saveRating,
    deleteRating,
};

export default RatingService;
