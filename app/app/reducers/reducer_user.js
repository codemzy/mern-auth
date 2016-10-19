import {FETCH_USER} from '../actions/types.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    if (action.type === FETCH_USER) {
        return action.payload;
    }
    return state;
}