import axios from 'axios';

// LOG IN
export const logIn = function(email, password) {
    return axios.post('/api/user/signin', {email, password})
        .then((response) => {
            // response.data.token is the token value
            return response.data;
        }, (error) => {
            throw new Error("Log in failed");
        });
};

// REGISTER
export const register = function(email, password) {
    return axios.post('/api/user/signup', {email, password})
        .then((response) => {
            // response.data.token is the token value
            return response.data;
        }, (error) => {
            throw new Error("Registration failed");
        });
};

// FORGOT PW
export const forgotPassword = function(email) {
    return axios.post('/api/user/forgotten', {email})
        .then((response) => {
            return response.data.message;
        }, (error) => {
            throw new Error("Invalid email");
        });
};

// RESET PW
export const resetPassword = function(email, password, reset) {
    return axios.post('/api/user/password/reset', {email, password, reset})
        .then((response) => {
            return response.data;
        }, (error) => {
            throw new Error("Reset failed");
        });
};