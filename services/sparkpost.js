require('dotenv').config({path: '../private/.env'});
const SPARKPOST_KEY = process.env.SPARKPOST_KEY;

var SparkPost = require('sparkpost');
var sp = new SparkPost(SPARKPOST_KEY);

const APP_NAME = 'My App';
const APP_EMAIL = 'testing@sparkpostbox.com';

exports.welcomeEmail = function (email, emailConfirmCode) {
 
    sp.transmissions.send({
      transmissionBody: {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Your new account',
          html:'<html><body><p>Hello and welcome to ' + APP_NAME + '!</p>\
          <p>Thanks so much for joining us.</p>\
          <p>You can login to your ' + APP_NAME + ' account right now to get started.</p>\
          <p>Please click the link below to confirm your email address and fully activate your account.</p>\
          <p>' + emailConfirmCode + '</p>\
          <p>This email confirmation link will expire in 24 hours.</p>\
          <p>Have any questions? Just send us an email! We\'re always here to help.</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          {address: email}
        ]
      }
    }, function(err, res) {
      if (err) {
        console.log('Whoops! Something went wrong with the welcomeEmail');
        console.log(err);
      }
    });

};


exports.forgotPasswordEmail = function (email, resetToken, callback) {
 
    sp.transmissions.send({
      transmissionBody: {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Password Reset',
          html:'<html><body><p>Someone (hopefully you) requested a new password for the ' + APP_NAME + ' account for ' + email + '.</p>\
          <p>Use the link below to set up a new password for your account.</p>\
          <p>' + resetToken + '</p>\
          <p>This password reset is only valid for the next 60 minutes.</p>\
          <p>No changes have been made to your account, so if you don\'t want to change your password, or requested a new password in error, you don\'t need to take any action and can safely ignore this email.</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          {address: email}
        ]
      }
    }, function(err, res) {
      if (err) {
        console.log('Whoops! Something went wrong with the forgotPasswordEmail');
        callback(err);
      } else {
        callback(null, res);
      }
    });

};

exports.lockedOutEmail = function (email, callback) {
 
    sp.transmissions.send({
      transmissionBody: {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Account Locked Out',
          html:'<html><body><p>Someone (hopefully you) has had 10 failed log in attempts on the ' + APP_NAME + ' account for ' + email + '.</p>\
          <p>For your security, we have locked your account for 60 minutes.</p>\
          <p>You will not be able to reset your password or log in for 1 hour.</p>\
          <p>After 60 minutes, you can log in as normal, or request a password reset by selecting \'Forgot my password\' from the log in page.</p>\
          <p>The account locks will clear on their own after an hour.</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          {address: email}
        ]
      }
    }, function(err, res) {
      if (err) {
        console.log('Whoops! Something went wrong with the lockedOutEmail');
        callback(err);
      } else {
        callback(null, res);
      }
    });

};