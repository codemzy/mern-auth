// Router set up
const React = require('react');
const {Route, Router, IndexRoute, browserHistory} = require('react-router');

// Components
import Main from '../components/Main';
import Home from '../components/Home';
import About from '../components/About';

// Routes
const routes = (
    <Router history={browserHistory}> 
        <Route path="/app" component={Main}>
            <IndexRoute component={Home} />
            <Route path='/app/about' header='About' component={About} />
        </Route>
    </Router>
);

export default routes;