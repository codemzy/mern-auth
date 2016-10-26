// Router set up
var React = require('react');
var {Route, Router, IndexRoute, browserHistory} = require('react-router');

// Components
var Main = require('../components/Main');
var LogIn = require('../components/LogIn');
var ForgotPw = require('../components/ForgotPw');
var ForgotPwReset = require('../components/ForgotPwReset');
var Register = require('../components/Register');
var Account = require('../components/Account');

// Routes
var routes = (
    <Router history={browserHistory}> 
        <Route path="/" component={Main}>
            <IndexRoute component={LogIn} />
            <Route path='/login' header='Log In' component={LogIn} />
            <Route path='/login/forgotten' header='Forgotten Password' component={ForgotPw} />
            <Route path='/login/forgotten/reset/:token' header='Reset Password' component={ForgotPwReset} />
            <Route path='/login/register' header='Register' component={Register} />
            <Route path='/login/account' header='Account' component={Account} />
        </Route>
    </Router>
);

module.exports = routes;