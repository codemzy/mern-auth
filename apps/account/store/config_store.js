import * as redux from 'redux';
import thunk from 'redux-thunk';

// reducers
import reducers from '../reducers/index.js';

export let configure = (initialState = {}) => {
    
    // set up the store
    let store = redux.createStore(reducers, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
    // return the store
    return store;
};