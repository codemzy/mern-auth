import {NEW_ERROR, REMOVE_ERROR} from '../actions/types.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    if (action.type === NEW_ERROR) {
        return action.payload;
    }
    if (action.type === REMOVE_ERROR) {
        return {};
    }
    return state;
}