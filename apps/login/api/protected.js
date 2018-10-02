import axios from 'axios';

// PROTECTED
export const protectedData = function() {
    return axios.get('/protected')
        .then((response) => {
            return response.data;
        }, (error) => {
            throw new Error("Access denied");
        });
};
