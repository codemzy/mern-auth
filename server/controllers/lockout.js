'use strict';

// get db connection 
const db = require('../server').db;

// get email services
const email = require('../services/sparkpost');

// ------ ACCOUNT LOCK OUT ------

// check if user is locked out of account
exports.checkLockOut = function(time) {
    // if no time then no lockout
    if (!time) {
        return false;
    }
    // otherwise, check if the time of lock out is less than 60 mins ago
    const now = new Date().getTime();
    const difference = time - now;
    let timeLeft = Math.floor(difference / 1000 / 60) + 60;
    if (timeLeft < 1) {
        // lock out has expired
        return false;
    } else {
        // lock out still active
        return true;
    }
};

// remove lock out
exports.removeLockOut = function(email, callback) {
    db.collection('users').updateOne({ email: email }, { $set: { "lockOut.lockedOut" : false } }, function(err, updated) {
        if (err) {
            return callback(err);
        }
        return callback(null, "Lock out removed");
    });
};

// add a failed log in attempt to account
exports.failedLogIn = function(ip, user, callback) {
    const NOW = new Date().getTime();
    const FAIL_OBJ = { "time": NOW, "ip": ip };
    let lockObj = {
        lockedOut: false,
        fails: user.lockOut ? user.lockOut.fails : []
    };
    // push this fail onto the fails array
    lockObj.fails.push(FAIL_OBJ);
    // if more than 5 fails
    if (lockObj.fails.length > 5) {
        let validFails = lockObj.fails.filter((fail) => {
            return this.checkLockOut(fail.time);
        }); 
        lockObj.fails = validFails;
        if (validFails.length > 9) {
            lockObj.lockedOut = true;
            lockObj.time = NOW;
        } 
    }
    // update to db
    db.collection('users').updateOne({ email: user.email }, { $set: { "lockOut" : lockObj } }, function(err, updated) {
        if (err) {
            return callback(err);
        }
        // if the account has been locked out, email the user to let them know
        if (lockObj.lockedOut) {
            email.lockedOutEmail(user.email, function(err, success) {
                if (err) {
                    throw(err);
                }
            });
        }
        // Callback indicating if user now locked out
        return callback(null, lockObj.lockedOut);
    });
}.bind(this);

// ------ EMAIL FLOOD LOCKS ------

// Currently only used on forgotPasswordEmail as only email that could be repeatedly triggered by user

// check if email notification of same type been sent in last 10 minutes
exports.sentMailCheck = function(subject, sentMail) {
    // if no sentMail
    if (!sentMail) {
        return false;
    }
    const NOW = new Date().getTime();
    let sentPrev = false;
    sentMail.map((mail) => {
        const difference = mail.time - NOW;
        let timeLeft = Math.floor(difference / 1000 / 60) + 10;
        // if there is an email with the same subject sent in the last 10 mins
        if (mail.email === subject && timeLeft > 0) {
            sentPrev = true;
        }
    });
    return sentPrev;
};

// to track sent email notifications to stop / reduce spam attacks
exports.sentMailTracker = function(ip, subject, sentMail) {
    const NOW = new Date().getTime();
    const SENT_OBJ = { "time": NOW, "ip": ip, "email": subject };
    let sentArr = sentMail || [];
    // push this email onto the sent array
    sentArr.push(SENT_OBJ);
    // only keep last 10 records
    if (sentArr.length > 10) {
        sentArr.shift();
    }
    // return updated sentMail array
    return sentArr;
};
            