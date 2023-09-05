import axios from 'axios';
import AuthService from './auth.service';
const API_URL = 'http://localhost:8083/api/notification/';

const getNotifications = (status) => {
    let userId = JSON.parse(localStorage.getItem('user')).id;
    return axios.get(API_URL + 'getNotifications/' + userId + '/' + status);
};

const createNotification = (userId, type) => {
    const headers = AuthService.authHeader(false);
    return axios.get(API_URL + 'createNotification/' + userId + '/' + type, {
        headers: headers,
    });
};

const markAsRead = (notifId) => {
    return axios.get(API_URL + 'markAsRead/' + notifId);
};

const NotificationService = {
    getNotifications,
    createNotification,
    markAsRead,
};

export default NotificationService;
