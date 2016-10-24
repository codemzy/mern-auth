import {FETCH_USER, EMAIL_CODE, EMAIL_CONFIRM} from '../actions/types.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    if (action.type === FETCH_USER) {
        return action.payload;
    }
    if (action.type === EMAIL_CONFIRM) {
        return { ...state, emailConfirmed: true };
    }
    return state;
}