// Router set up
var React = require('react');
var {Route, Router, IndexRedirect, Redirect, browserHistory} = require('react-router');

export const basePath = "/app";

// Components
var Main = require('../components/Main');
var LogIn = require('../components/LogIn');
var ForgotPw = require('../components/ForgotPw');
var ForgotPwReset = require('../components/ForgotPwReset');
var Register = require('../components/Register');
var Account = require('../components/Account');

// Routes
const routes = (
    <Router history={browserHistory}> 
        <Route path={basePath} component={Main}>
            <IndexRedirect to={basePath + '/login'} />
            <Route path={basePath + '/login'} component={LogIn} />
            <Route path={basePath + '/login/forgotten'} header='Forgotten Password' component={ForgotPw} />
            <Route path={basePath + '/login/forgotten/reset/:token'} header='Reset Password' component={ForgotPwReset} />
            <Route path={basePath + '/register'} header='Register' component={Register} />
            <Redirect from="*" to={basePath + '/login'}  />
        </Route>
    </Router>
);

module.exports = routes;