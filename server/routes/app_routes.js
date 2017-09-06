const express = require('express');
const router = express.Router();

// services
const passport = require('passport');
require('../services/passport.js'); // this needs to be run but is not directly referenced in this file

// session false as we are not using cookies, using tokens
// redirect to app if user is auth'd
const checkUserAuth = function(req, res) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) { 
            // problem with auth so try login
            // clear the user object on the req and the cookie (if expired one held)
            req.logout();
            res.clearCookie('jwt', { httpOnly: true, secure: true });
            return res.sendFile(process.cwd() + '/public/html/login.html');
        }
        if (user) {
            // they are auth'd and can access the app
            return res.sendFile(process.cwd() + '/public/html/app.html');
        } else {
            // no user so need to login
            // clear the user object on the req and the cookie (if expired one held)
            req.logout();
            res.clearCookie('jwt', { httpOnly: true, secure: true });
            return res.sendFile(process.cwd() + '/public/html/login.html');
        }
    })(req, res);
};

// ROUTES -----------------------------------------------------

router.get('/', function(req, res) {
    // check if the user has an active role
    checkUserAuth(req, res);
});

router.get('/*', function(req, res) {
    // check if the user has an active role
    checkUserAuth(req, res);
});

module.exports = router;