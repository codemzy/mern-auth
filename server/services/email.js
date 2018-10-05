// not wired up to actual email service so you can use any - while testing just logs to console

const APP_NAME = 'My App';
const APP_URL = 'https://www.myapp.com';
const APP_EMAIL = 'testing@myapp.com';

exports.welcomeEmail = function (email, emailConfirmCode) {
 
    let emailTransmission = {
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
          { address: email }
        ]
    };
    console.log(emailTransmission); // log while testing
};