// action types
import { NEW_ALERT } from './types';

// ----- ACTIONS ------

// Remove user info from state
export const addAlert = (title, error, type) => {
    return {
        type: NEW_ALERT,
        payload: { title: title, message: error, type: type }
    };
};