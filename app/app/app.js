const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

// Load redux store
import { configure } from './store/config_store';
const store = configure();
// Load actions
import { fetchUserInfo } from './actions/actions_user';

// routes
import routes from './config/router';

// if we dont have the user data, fetch it to state
if (!store.getState().user.email) {
    // dispatch action to fetch user data
    store.dispatch(fetchUserInfo());
}

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));