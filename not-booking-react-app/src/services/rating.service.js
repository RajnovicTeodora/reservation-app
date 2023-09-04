import axios from 'axios';
import AuthService from './auth.service';
const API_URL = 'http://localhost:8080/api/rating/';

const getAvgAccommodationScore = (accommodationId) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAvgAccommodationScore/' + accommodationId, {
        headers: headers,
    });
};

const getAvgHostScore = (hostUsername) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAvgHostScore/' + hostUsername, {
        headers: headers,
    });
};

const getAllAccommodationScores = (accommodationId) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAllAccommodationScores/' + accommodationId, {
        headers: headers,
    });
};

const getAllHostScores = (hostUsername) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'getAllHostScores/' + hostUsername, {
        headers: headers,
    });
};

const getExistingAccommodationScore = (accommodationId) => {
    const headers = AuthService.authHeader(false);
    let username = JSON.parse(localStorage.getItem('user')).username;
    return axios.get(
        API_URL + 'getExistingAccommodationScore/' + username + '/' + accommodationId,
        {
            headers: headers,
        }
    );
};

const getExistingHostScore = (hostUsername) => {
    const headers = AuthService.authHeader(false);
    let username = JSON.parse(localStorage.getItem('user')).username;
    return axios.get(API_URL + 'getExistingHostScore/' + username + '/' + hostUsername, {
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
