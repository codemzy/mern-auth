// Router set up
const React = require('react');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');

// Components
import Main from '../components/Main';
import Home from '../components/Home';

// Routes
const routes = (
    <Router history={browserHistory}> 
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path='/home' header='Home' component={Home} />
        </Route>
    </Router>
);

export default routes;