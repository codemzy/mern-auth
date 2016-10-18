const express = require('express');
const router = express.Router();

// services
const passport = require('passport');
require('../services/passport.js'); // this needs to be run but is not directly referenced in this file

// session false as we are not using cookies, using tokens
// check if user is auth'd, if not redirect
const checkAuth = passport.authenticate('jwt', { session: false, failureRedirect: '/login' });

// ROUTES -----------------------------------------------------

// router.get('/',
//   passport.authenticate('jwt', { session: false, successRedirect: '/',
//                                   failureRedirect: '/app/login' }));

router.get('/', checkAuth, function(req, res) {
    // TO DO APP app.html
    res.sendFile(process.cwd() + '/public/html/index.html');
});


router.get('/*', function(req, res) {
    // TO DO APP app.html
    // for now just return app, in future, check auth etc
    res.sendFile(process.cwd() + '/public/html/login.html');
});

module.exports = router;