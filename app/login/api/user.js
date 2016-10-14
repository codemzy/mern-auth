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
            throw new Error(error);
        });
};