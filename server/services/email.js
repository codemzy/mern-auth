// not wired up to actual email service so you can use any
// just logs to console but in production need to wire up to email service

const APP_NAME = 'My App';
const APP_URL = 'https://www.myapp.com';
const APP_EMAIL = 'testing@myapp.com';
const REPLY_EMAIL = 'support@myapp.com';

// NEW USER REGISTERED EMAIL
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

// CONFIRM EMAIL REQUEST CODE
exports.confirmEmail = function (email, emailConfirmCode) {
    // the email
    let emailTransmission = {
        content: {
            from: APP_EMAIL,
            reply_to: REPLY_EMAIL,
            subject: APP_NAME + ': Confirm your email',
            html:'<html><body><p>Hello!</p>\
            <p>Your email confirmation code is:</p>\
            <p><b>' + emailConfirmCode + '</b></p>\
            <p>Enter this code in Account > Settings > Email > Confirm Email, to verify your email address.</p>\
            <p>This email confirmation link will expire in 24 hours.</p>\
            <p>Have any questions? Check out our <a href="' + APP_URL + '/support">support</a> for answers and to get in touch with our support team.</p>\
            <p>Kind Regards,</p>\
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