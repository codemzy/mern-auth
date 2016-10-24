import {FETCH_USER, EMAIL_CODE} from '../actions/types.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    if (action.type === FETCH_USER) {
        return action.payload;
    }
    if (action.type === EMAIL_CODE) {
        return { ...state, ecc: true };
    }
    return state;
}