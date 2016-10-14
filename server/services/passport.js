'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const bcrypt = require('bcrypt-nodejs');
require('dotenv').config({path: '../private/.env'});
const secret = process.env.SECRET_STR;

// get lockout functions
const lockout = require('../controllers/lockout');

// bcrypt encrypts the provided password with the salt off the user.password, and sees if the 
// encrypted version of the provided password matches the stored encrypted password
const comparePassword = function(suppliedPassword, userPassword, callback) {
    bcrypt.compare(suppliedPassword, userPassword, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

// get db connection 
const db = require('../server').db;
// so can create object id to find user in jwtLogin
let ObjectID = require('mongodb').ObjectID;

// Create local strategy for signing in with username and password
const localOptions = { 
    usernameField: 'email', 
    // ADDED FOR LOCKOUT - to pass in the req from our route (check if a user is lockout to prevent brute force)
    passReqToCallback : true 
};

const localLogin = new LocalStrategy(localOptions, function(req, email, password, done) {
    // verify the email and password call done with user if correct
    // otherwise call done with false
    db.collection('users').findOne({ email: email }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        // user not found - no record for email address
        if (!user) {
            return done(null, false);
        }
        // account locked out
        if (user.lockOut && user.lockOut.lockedOut && lockout.checkLockOut(user.lockOut.time)) {
            return done(null, false);
        }
        // email found, compare passwords
        comparePassword(password, user.password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                const IP = req.headers["x-forwarded-for"];
                lockout.failedLogIn(IP, user, function(err, isLockedOut) {
                    if (err) {
                        return done(err);
                    }
                    return;
                });
                return done(null, false);
            }
            return done(null, user);
        });
    });
    
});

// Set up options for JWT strategy
const jwtOptions = {
    // look in the header of the request for the token
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // decode with the secret
    secretOrKey: secret
};

// Create JWT strategy
// payload is the token (sub) and timestamp (iat)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // see if the user ID in the payload exists in our database
    // if it does call done with that user
    // otherwise call done without a user object
    let obj_id = new ObjectID(payload.sub);
    db.collection('users').findOne({ "_id": obj_id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        // if we find a user and they are not lockedOut
        if (user) {
            // if the user is locked out
            if (user.lockOut && user.lockOut.lockedOut && lockout.checkLockOut(user.lockOut.time)) {
                done(null, false);
            } else {
                // the user is not locked out and the token is valid
                done(null, user);
            }
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


