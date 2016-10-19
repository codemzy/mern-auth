const express = require('express');
const router = express.Router();

// services
const passport = require('passport');
require('../services/passport.js'); // this needs to be run but is not directly referenced in this file

// session false as we are not using cookies, using tokens
// check if user is auth'd, if not redirect
const checkAuth = passport.authenticate('jwt', { session: false, failureRedirect: '/login' });

// ROUTES -----------------------------------------------------

router.get('/', checkAuth, function(req, res) {
    res.sendFile(process.cwd() + '/public/html/app.html');
});

router.get('/*', checkAuth, function(req, res) {
    res.sendFile(process.cwd() + '/public/html/app.html');
});

module.exports = router;