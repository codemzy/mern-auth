const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

// Load redux store
import { configure } from './store/config_store';
const store = configure();

// routes
import routes from './config/router';

// if (!store.getState().user.email) {
//     // dispatch action to fetch user data
// }

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'));