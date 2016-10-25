const express = require('express');
const router = express.Router();

// services
const passport = require('passport');
require('../services/passport.js'); // this needs to be run but is not directly referenced in this file

// session false as we are not using cookies, using tokens
// redirect to app if user is auth'd
const checkForUser = function(req, res) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) { 
            return res.sendFile(process.cwd() + '/public/html/login.html');
        }
        if (user) {
            return res.redirect('/app');
        } else {
            return res.sendFile(process.cwd() + '/public/html/login.html');
        }
    })(req, res);
};

// ROUTES -----------------------------------------------------

router.get('/', function(req, res) {
    checkForUser(req, res);
});

router.get('/*', function(req, res, next) {
    checkForUser(req, res);
});

module.exports = router;