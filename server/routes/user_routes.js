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

// SIGN OUT
// delete cookie and user object on req and redirect user
router.post('/signout', jsonParser, requireAuth, Authentication.signout);

// VERIFY EMAIL
// request an email with an email confirm code to signed in user
router.get('/emailcode', requireAuth, Authentication.emailCode);
// require user to be signed in to verify email address
router.get('/verify/:emailCode', requireAuth, Authentication.emailConfirm);
    
// FORGOT PASSWORD
// check user email exists in DB and set resetToken
router.post('/forgotten', jsonParser, Authentication.forgotpw);
// check a reset link is valid
router.get('/reset/:resetCode', Authentication.resetCheck);
// take password data and set new password
router.post('/password/reset', jsonParser, Authentication.resetpw);

// CHANGE PASSWORD
// take the old password and new password and update the password
router.post('/password/change', jsonParser, requireAuth, Authentication.changepw);

// USER INFO
router.get('/info', requireAuth, function(req, res) {
    res.json({ email: req.user.email, emailConfirmed: req.user.emailConfirmed });
});


module.exports = router;