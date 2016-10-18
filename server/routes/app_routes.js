const express = require('express');
const router = express.Router();

// services
const passport = require('passport');
require('../services/passport.js'); // this needs to be run but is not directly referenced in this file

// session false as we are not using cookies, using tokens
const requireAuth = passport.authenticate('jwt', { session: false });
router.use(passport.initialize());

// ROUTES -----------------------------------------------------

router.get('/',
  passport.authenticate('jwt', { session: false, successRedirect: '/',
                                   failureRedirect: '/app/login' }));

router.get('/login', function(req, res) {
    res.sendFile(process.cwd() + '/public/html/login.html');
});

router.get('/*', function(req, res) {
    // TO DO
    // for now just return app, in future, check auth etc
    res.sendFile(process.cwd() + '/public/html/login.html');
});

module.exports = router;