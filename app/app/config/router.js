// Router set up
const React = require('react');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');

// Components
import Main from '../components/Main';
import Home from '../components/Home';
import About from '../components/About';
import Account from '../components/Account';

// Routes
const routes = (
    <Router history={browserHistory}> 
        <Route path="/app" component={Main}>
            <IndexRoute component={Home} />
            <Route path='/app/about' header='About' component={About} />
            <Route path='/app/account' header='User Account' component={Account} />
        </Route>
    </Router>
);

export default routes;