import axios from 'axios';

// action types
import { FETCH_USER, REMOVE_USER, EMAIL_CONFIRM, NEW_ALERT } from './types';

// ----- THUNK ACTION CREATORS ------

// Log out user and remove user info from state
export function logOutUser() {
    return function(dispatch) {
        return axios.post('/api/user/signout', {
                headers: { authorization: "csrf token TO DO??" }
        })
            .then((response) => {
                dispatch({
                    type: REMOVE_USER
                });
            })
            .catch(() => {
                throw new Error("User not found");
            });
    };
}

// Fetch user info to state
export function fetchUserInfo() {
    return function(dispatch) {
        axios.get('/api/user/info', {
                headers: { authorization: "csrf token TO DO??" }
        })
            .then((response) => {
                dispatch({
                    type: FETCH_USER,
                    payload: response.data
                });
            })
            .catch(() => {
                throw new Error("User not found");
            });
    };
}

// Request email confirm code for user
export function requestEmailCode() {
    return function(dispatch) {
        axios.get('/api/user/emailcode', {
                headers: { authorization: "csrf token TO DO??" }
        })
            .then((response) => {
                dispatch({
                    type: NEW_ALERT,
                    payload: { message: "We have sent you an email confirm code, click the link to confirm your email address.", type: "email" }
                });
            })
            .catch(() => {
                throw new Error("Error");
            });
    };
}

// Send email confirm code to API
export function confirmEmailCode(emailCode) {
    return function(dispatch) {
        return axios.get('/api/user/verify/' + emailCode, {
                headers: { authorization: "csrf token TO DO??" }
        })
            .then((response) => {
                dispatch({
                    type: EMAIL_CONFIRM
                });
            })
            .catch(() => {
                throw new Error("Invalid token");
            });
    };
}



// ----- API ACTIONS (DONT CHANGE STATE) ------

// Change password
export const changePassword = function(oldPassword, newPassword) {
    return axios.post('/api/user/password/change', {oldPassword, newPassword}, {
                headers: { authorization: "csrf token TO DO??" }
        })
        .then((response) => {
            return response.data;
        }, (error) => {
            throw new Error(error.response.data.error);
        });
};