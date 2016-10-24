import axios from 'axios';

// action types
import { FETCH_USER, REMOVE_USER, EMAIL_CODE, EMAIL_CONFIRM } from './types';

// ----- ACTIONS ------

// Remove user info from state
export const removeUserInfo = () => {
    return {
        type: REMOVE_USER
    };
};

// ----- THUNK ACTIONS ------

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
                    type: EMAIL_CODE
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
        return axios.get('/verify/' + emailCode, {
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