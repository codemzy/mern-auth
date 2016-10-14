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
        <Route path="/login" component={Main}>
            <IndexRoute component={LogIn} />
            <Route path='/login/forgotten' header='Forgotten Password' component={ForgotPW} />
        </Route>
    </Router>
);

module.exports = routes;