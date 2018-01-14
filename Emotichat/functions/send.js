const mongoose = require('mongoose');
const messageDetails = new mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
        required: true,
    },
    to: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    from: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        unique: false,
        required: true,
        trim: false,
    }
});

/**
* @param {string} userName The user's username
* @param {string} message The user's message
* @returns {any}
*/
module.exports = (userName, message, context, callback) => {
  callback(null, `userName: ${userName}, Message: ${message}`);
};
