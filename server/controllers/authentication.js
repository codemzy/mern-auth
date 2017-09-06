'use strict';

const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

const secret = process.env.SECRET_STR;

// get db connection 
const db = require('../server').db;
// so can create object id to find user by ID
let ObjectID = require('mongodb').ObjectID;

// get email services
const email = require('../services/sparkpost');
// get compare password from passport
const comparePassword = require('../services/passport').comparePassword;

// get validation functions
const validate = require('./validate');
// get locked out functions
const lockout = require('./lockout');


// expiration for tokens and cookies
const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

// create token
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    const expireTime = timestamp + (1000 * 60 * 60 * 24 * 7); // expires in 7 days
    // the subject (sub) of this token is the user id, iat = issued at time, exp = expiry time
    return jwt.encode({ sub: user.id, iat: timestamp, exp: expireTime }, secret);
}

// hash password
function hashPassword(password, callback) {
    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return callback(err);
        }
        // hash (encrypt) the password using the salt then run callback
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return callback(err);
            }
            // overwrite plain text password with encrypted password
            callback(null, hash);
        });
    });
}

// create link code 
// for confirming email and forgotten passwords
function createLinkCode(type) {
    // timestamp so can check age and random number to create linkCode
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const linkCode = timestamp + '-' + randomNum + '-' + type;
    return linkCode;
}

// check link codes are valid
function checkCodeTime(linkCode) {
    if (!linkCode) {
        return false;
    }
    const tokenArr = linkCode.split("-");
    const timestamp = tokenArr[0];
    const now = new Date().getTime();
    const difference = timestamp - now;
    // default to 1 hour
    let timeLeft = Math.floor(difference / 1000 / 60) + 60;
    // if email confirmation expire in 24 hours
    if (tokenArr[2] === "ecc") {
        timeLeft = Math.floor(difference / 1000 / 60) + 60 * 24;
    }
    if (timeLeft < 1) {
        // expired
        return false;
    } else {
        // valid
        return timeLeft;
    }
}

exports.signup = function(req, res, next) {
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;
    // check if any data missing
    if (!EMAIL || !PASSWORD) {
        return res.status(422).send({ error: 'You must provide email and password'});
    }
    // check if email is a string and a valid email format
    if (!validate.checkString(EMAIL) || !validate.checkEmail(EMAIL)) {
        return res.status(422).send({ error: 'Email is not valid'});
    }
    // check if password is a string
    if (!validate.checkString(PASSWORD)) {
        return res.status(422).send({ error: 'Password is not valid'});
    }
    // check if password is long enough
    if (!validate.checkPasswordLength(PASSWORD)) {
        return res.status(422).send({ error: 'Password is too short'});
    }
    // check if password and email match each other
    if (EMAIL === PASSWORD) {
        return res.status(422).send({ error: 'Password must not match email address'});
    }
    // See if a user with the given email exists
    db.collection('users').findOne({ email: EMAIL }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        // If a user with the email does exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use'});
        }
        // If a user with email does not exist, hash passord
        hashPassword(PASSWORD, function(err, hash) {
            if (err) {
                return next(err);
            }
            // create email confirm code
            const emailConfirmCode = createLinkCode("ecc");
            // create and save user record
            const USER = {
                email: EMAIL,
                password: hash,
                emailConfirmed: false,
                emailConfirmCode: emailConfirmCode
            };
            // save the user we just created
            db.collection('users').insertOne(USER, function(err, result) {
                if (err) {
                    return next(err);
                }
                // Send a welcome email
                email.welcomeEmail(EMAIL, emailConfirmCode);
                // Respond to request indicating the user was created
                const USER_TOKEN = tokenForUser({ id: result.insertedId });
                res.cookie('jwt', USER_TOKEN, { maxAge: MAX_AGE, httpOnly: true, secure: true });
                res.send({ success: "You are now registered" });
            });
        });
    });
};

exports.signin = function(req, res, next) {
    // If account was locked out before we can remove the lock out
    if (req.user.lockOut && req.user.lockOut.lockedOut) {
        lockout.removeLockOut(req.user.email, function(err, success) {
            if (err) {
                console.log("Problem removing Lockout");
            }
        });
    }
    // User has already had their email and password auth'd we just need to give them a token
    const USER_TOKEN = tokenForUser({ id: req.user._id });
    res.cookie('jwt', USER_TOKEN, { maxAge: MAX_AGE, httpOnly: true, secure: true });
    res.send({ success: "You are now logged in" });
};

exports.signout = function(req, res, next) {
    // Clear the user object on the req, the cookie and redirect
    req.logout();
    res.clearCookie('jwt', { httpOnly: true, secure: true });
    res.send({ success: "You are now logged out" });
};

exports.emailCode = function(req, res, next) {
    // user is signed in
    const EMAIL = req.user.email;
    // if email is already confirmed don't need to confirm again
    if (req.user.emailConfirmed) {
        return res.json({ message: 'Email confirmed', code: 'ec' });
    }
    // if the emailConfirmEmail has already been sent in last 10 mins
    if (lockout.sentMailCheck('emailConfirmEmail', req.user.sentMail)) {
        return res.json({ message: 'Thank you. Please check your email.', code: 'le' });
    }
    // create email confirm code
    const emailConfirmCode = createLinkCode("ecc");
    // so we can update the sentMail array
    const IP = req.headers["x-forwarded-for"];
    const sentMail = lockout.sentMailTracker(IP, 'emailConfirmEmail', req.user.sentMail);
    // update the user in the DB
    db.collection('users').updateOne({ email: EMAIL }, { $set: { "emailConfirmCode" : emailConfirmCode, "sentMail": sentMail } }, function(err, updated) {
        if (err) {
            return next(err);
        }
        // Send a email confirm code email
        email.confirmEmail(EMAIL, emailConfirmCode);
        // Respond to request indicating the email confirm code was sent
        res.json({ message: 'Thank you. Please check your email.', code: 'es' });
    });
};

exports.emailConfirm = function(req, res, next) {
    const EMAIL_CODE = req.params.emailCode;
    // User is already signed in so we just need to check the emailToken matches their token
    const USER_ID = req.user._id;
    // Check ecc is valid
    const timeLeft = checkCodeTime(EMAIL_CODE);
    // if token expired
    if (!timeLeft) {
        return res.status(422).send({ error: 'Invalid link'});
    }
    // See if a user with the id exists
    let obj_id = new ObjectID(USER_ID);
    db.collection('users').findOne({ _id: obj_id }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        // If the email link does match, update the DB to confirm the email
        if (existingUser.emailConfirmCode === EMAIL_CODE) {
            // update to db
            db.collection('users').updateOne({ _id: obj_id }, { $set: { "emailConfirmed" : true }, $unset: { "emailConfirmCode": "" } }, function(err, updated) {
                if (err) {
                    return next(err);
                }
                // Respond to request as email is confirmed
                return res.json({ message: 'Email confirmed', timeleft: timeLeft });
            });
        } else {
            // either the user doesnt exist or the code doesn't match so link is invalid
            return res.status(422).send({ error: 'Invalid link'});
        }
    });
};

exports.forgotpw = function(req, res, next) {
    // check if any data missing
    if (!req.body.email || !validate.checkString(req.body.email) || !validate.checkEmail(req.body.email)) {
        return res.status(422).send({ error: 'You must provide a valid email address'});
    }
    // transform to lower case
    const EMAIL = req.body.email.toLowerCase();
    // See if a user with the given email exists
    db.collection('users').findOne({ email: EMAIL }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            // check if they are locked out
            if (existingUser.lockOut && existingUser.lockOut.lockedOut && lockout.checkLockOut(existingUser.lockOut.time)) {
                // If a user with the email exists and they are locked out 
                // they will have already had an a email advising no resets for 60 mins
                return res.send({ message: 'Thank you. Please check your email.', code: 'lo' });
            } else if (lockout.sentMailCheck('forgotPasswordEmail', existingUser.sentMail)) {
                // If the forgotPasswordEmail has already been sent in last 10 mins
                return res.send({ message: 'Thank you. Please check your email.', code: 'le' });
            }
            // If a user with the email exists and they are not locked out, send an email with a reset password link
            // link expires after an hour, add a token to the user in the DB and this needs to match the token and email and not be expired
            // create linkCode for pw reset
            const resetToken = createLinkCode("pwr");
            // so we can update the sentMail array
            const IP = req.headers["x-forwarded-for"];
            const sentMail = lockout.sentMailTracker(IP, 'forgotPasswordEmail', existingUser.sentMail);
            // add to db
            db.collection('users').updateOne({ email: EMAIL }, { $set: { "resetPassword" : resetToken, "sentMail": sentMail } }, function(err, updated) {
                if (err) {
                    return next(err);
                }
                // Send forgotten password email
                email.forgotPasswordEmail(EMAIL, resetToken, function(err, success) {
                    if (err) {
                        return next(err);
                    }
                    // email sent return success message
                    return res.send({ message: 'Thank you. Please check your email.', code: 'ef' });
                });
            });
        } else {
            // email does not exist, return same message to not indicate whether a user has an account or not (privacy)
            return res.send({ message: 'Thank you. Please check your email.', code: 'en' });
        }
    });
};

exports.resetCheck = function(req, res, next) {
    const RESET_CODE = req.params.resetCode;
    const timeLeft = checkCodeTime(RESET_CODE);
    if (!timeLeft) {
        // TOKEN NOT VALID
        return res.status(422).send({ error: 'Reset link has expired'});
    } else {
        return res.send({ message: 'Reset link valid', timeleft: timeLeft });
    }
    
};

exports.resetpw = function(req, res, next) {
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;
    const RESET_CODE = req.body.reset;
    // check if any data missing
    if (!EMAIL || !PASSWORD) {
        return res.status(422).send({ error: 'You must provide email and new password'});
    }
    // check if reset token time is still valid
    if (!RESET_CODE || !checkCodeTime(RESET_CODE)) {
        return res.status(422).send({ error: 'Your forgotten password link has expired, you must use the link within 1 hour'});
    }
    // check if email is a string and a valid email format
    if (!validate.checkString(EMAIL) || !validate.checkEmail(EMAIL)) {
        return res.status(422).send({ error: 'Email is not valid'});
    }
    // check if password is a string
    if (!validate.checkString(PASSWORD)) {
        return res.status(422).send({ error: 'Password is not valid'});
    }
    // check if password is long enough
    if (!validate.checkPasswordLength(PASSWORD)) {
        return res.status(422).send({ error: 'Password is too short'});
    }
    // check if password and email match each other
    if (EMAIL === PASSWORD) {
        return res.status(422).send({ error: 'Password must not match email address'});
    }
    // See if a user with the given email exists
    db.collection('users').findOne({ email: EMAIL }, function(err, existingUser) {
        if (err) {
            return next(err);
        }
        // If a user with the email does not exist, return an error
        if (!existingUser) {
            return res.status(422).send({ error: 'Email not found'});
        }
        // If the reset link doesn't match, return an error
        if (existingUser.resetPassword !== RESET_CODE) {
            return res.status(422).send({ error: 'Reset link not valid'});
        }
        // If a user with email does exist and reset matches, hash new passord
        hashPassword(PASSWORD, function(err, hash) {
            if (err) {
                return next(err);
            }
            // new password hash
            const passwordHash = hash;
            // update to db
            db.collection('users').updateOne({ email: EMAIL }, { $set: { "password" : passwordHash }, $unset: { "resetPassword": "" } }, function(err, updated) {
                if (err) {
                    return next(err);
                }
                // Respond to request with a token now password is updated user is logged in
                const USER_TOKEN = tokenForUser({ id: existingUser._id });
                res.cookie('jwt', USER_TOKEN, { maxAge: MAX_AGE, httpOnly: true, secure: true });
                res.send({ success: "You are now logged in" });
            });
        });
    });
};

exports.changepw = function(req, res, next) {
    // user is signed in
    const EMAIL = req.user.email;
    const OLD_PASSWORD = req.body.oldPassword;
    const NEW_PASSWORD = req.body.newPassword;
    // check if any data missing
    if (!OLD_PASSWORD || !NEW_PASSWORD) {
        return res.status(422).send({ error: 'You must provide email and new password'});
    }
    // check if passwords are strings
    if (!validate.checkString(OLD_PASSWORD) && !validate.checkString(NEW_PASSWORD)) {
        return res.status(422).send({ error: 'Password is not valid'});
    }
    // check if new password is long enough
    if (!validate.checkPasswordLength(NEW_PASSWORD)) {
        return res.status(422).send({ error: 'Password is too short'});
    }
    // check if passwords and email match each other
    if (EMAIL === NEW_PASSWORD) {
        return res.status(422).send({ error: 'Password must not match email address'});
    }
    // compare old password to see if it matches stored hashed password
    comparePassword(OLD_PASSWORD, req.user.password, function(err, isMatch) {
        if (err) {
            return next(err);
        }
        if (!isMatch) {
            // keep track of fails to lock out if multiple fails
            const IP = req.headers["x-forwarded-for"];
            lockout.failedLogIn(IP, req.user, function(err, isLockedOut) {
                if (err) {
                    return next(err);
                }
                return;
            });
            return res.status(422).send({ error: 'Incorrect existing password supplied'});
        } else {
            // set the permissions date change
            const NOW = new Date().getTime();
            let permissions = {
                updatedAt: NOW
            };
            // hash the new password
            hashPassword(NEW_PASSWORD, function(err, newHash) {
                if (err) {
                    return next(err);
                }
                // update to db
                db.collection('users').updateOne({ email: EMAIL }, { $set: { "password" : newHash, "permissions": permissions } }, function(err, updated) {
                    if (err) {
                        return next(err);
                    }
                    // Respond to request with a new token now password is updated
                    const USER_TOKEN = tokenForUser({ id: req.user._id });
                    res.cookie('jwt', USER_TOKEN, { maxAge: MAX_AGE, httpOnly: true, secure: true });
                    res.send({ success: "Password has been updated" });
                });
            });
        }
    });
};


