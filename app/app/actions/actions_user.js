import axios from 'axios';

// action types
import { FETCH_USER, REMOVE_USER } from './types';

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