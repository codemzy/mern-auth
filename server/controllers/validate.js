'use strict';

// numerical encoding of some allowed special characters
exports.escapeInput = function(text) {
    // make sure we have string
    let s = '' + text;
    // check if any of our characters are present
    const matchHtmlRegExp = /["'&<>`]/;
    const match = matchHtmlRegExp.exec(s);
    // if not then return the string as it is
    if (!match) {
        return s;
    }
    // otherwise escape the characters
    s = s.replace(/&#/g,"##AMPHASH##"); // to prevent double encoding problems so can pass str through multiple times
    s = s.replace(/&/g,"&#38;");
	s = s.replace(/\'/g,"&#39;");
	s = s.replace(/\"/g,"&#34;");
	s = s.replace(/</g,"&#60;");
	s = s.replace(/>/g,"&#62;");
	s = s.replace(/\`/g,"&#96;");
    s = s.replace(/##AMPHASH##/g,"&#");
    return s;
};

// basic email format validation
exports.checkEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// check password length
exports.checkPasswordLength = function(password) {
    if (password.length < 8) {
        return false;
    } else {
        return true;
    }
};

// check if it is a string
exports.checkString = function(text) {
    if (typeof(text) === 'string') {
        return true;
    } else {
        return false;
    }
};

// check if it is a number 
exports.checkNum = function(num) {
    if (typeof(num) === 'number') {
        return true;
    } else {
        return false;
    }
};