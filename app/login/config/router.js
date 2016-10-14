// Router set up
var React = require('react');
var {Route, Router, IndexRoute, browserHistory} = require('react-router');

// Components
var Main = require('../components/Main');
var LogIn = require('../components/LogIn');
var ForgotPW = require('../components/ForgotPw');

// Routes
var routes = (
    <Router history={browserHistory}> 
        <Route path="/app" component={Main}>
            <IndexRoute component={LogIn} />
            <Route path='/app/login' header='Log In' component={LogIn} />
            <Route path='/app/login/forgotten' header='Forgotten Password' component={ForgotPW} />
        </Route>
    </Router>
);

module.exports = routes;