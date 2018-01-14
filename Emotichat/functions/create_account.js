const mongoose = require('mongoose');
const userDetails = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

/**
* @param {string} email The user's email
* @param {string} userName The user's user name.
* @param {string} password The user's password.
* @returns {any}
*/
module.exports = (email, userName, password, context, callback) => {

    callback(null, `Email: ${email}, Username: ${userName}, Password: ${password}`);
};
