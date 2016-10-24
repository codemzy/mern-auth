// action types
import { NEW_ERROR } from './types';

// ----- ACTIONS ------

// Remove user info from state
export const addError = (error, type) => {
    return {
        type: NEW_ERROR,
        payload: { message: error, type: type }
    };
};