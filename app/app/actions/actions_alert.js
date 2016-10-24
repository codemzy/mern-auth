// action types
import { NEW_ALERT, REMOVE_ALERT } from './types';

// ----- ACTIONS ------

// Add alert
export const addAlert = (message, type) => {
    return {
        type: NEW_ALERT,
        payload: { message: message, type: type }
    };
};

// Add alert
export const removeAlert = () => {
    return {
        type: REMOVE_ALERT
    };
};