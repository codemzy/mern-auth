const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// controllers
const Authentication = require('../controllers/authentication');
// services
const passport = require('passport');
require('../services/passport.js'); // this needs to be run but is not directly referenced in this file

// session false as we are not using cookies, using tokens
const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

// ROUTES -----------------------------------------------------

// SIGN UP
// take user data and create user in DB
router.post('/signup', jsonParser, Authentication.signup);

// SIGN IN    
// take user data and check user exists in DB
router.post('/signin', jsonParser, requireSignIn, Authentication.signin);

// VERIFY EMAIL
// require user to be signed in to verify email address
router.get('/verify/:emailCode', requireAuth, Authentication.emailConfirm);
    
// FORGOT PASSWORD
// check user email exists in DB and set resetToken
router.post('/forgotten', jsonParser, Authentication.forgotpw);
// check a reset link is valid
router.get('/reset/:resetCode', Authentication.resetCheck);
// take password data and set new password
router.post('/password/reset', jsonParser, Authentication.resetpw);


module.exports = router;