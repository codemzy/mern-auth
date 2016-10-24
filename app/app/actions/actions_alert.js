// action types
import { NEW_ALERT } from './types';

// ----- ACTIONS ------

// Remove user info from state
export const addAlert = (message, type) => {
    return {
        type: NEW_ALERT,
        payload: { message: message, type: type }
    };
};