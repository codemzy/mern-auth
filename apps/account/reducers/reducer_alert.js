import {NEW_ALERT, REMOVE_ALERT} from '../actions/types.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    if (action.type === NEW_ALERT) {
        return action.payload;
    }
    if (action.type === REMOVE_ALERT) {
        return {};
    }
    return state;
}