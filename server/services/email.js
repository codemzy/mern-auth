// not wired up to actual email service so you can use any
// just logs to console but in production need to wire up to email service

const APP_NAME = 'My App';
const APP_URL = 'https://www.myapp.com';
const APP_EMAIL = 'testing@myapp.com';

exports.welcomeEmail = function (email, emailConfirmCode) {
    // the email
    let emailTransmission = {
        content: {
          from: APP_EMAIL,
          subject: APP_NAME + ': Your new account',
          html:'<html><body><p>Hello and welcome to ' + APP_NAME + '!</p>\
          <p>Thanks so much for joining us.</p>\
          <p>You can login to your ' + APP_NAME + ' account right now to get started.</p>\
          <p>Your email confirmation code is:</p>\
          <p><b>' + emailConfirmCode + '</b></p>\
          <p>This email confirmation link will expire in 24 hours.</p>\
          <p>Have any questions? Just send us an email! We\'re always here to help.</p>\
          <p>Support at ' + APP_NAME + '</p>\
          </body></html>'
        },
        recipients: [
          { address: email }
        ]
    };
    // just log code but in production need to wire up to email service
    console.log("Email confirm code is:", emailConfirmCode);
};