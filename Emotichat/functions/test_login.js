const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('../model/User');

/**
* @param {string} userName The user's user name.
* @param {string} password The user's password.
* @returns {any}
*/
module.exports = (userName, password, context, callback) => {
    let mongoUri = process.env['MONGO_URI'];
    let options = {
        useMongoClient: true,
    }

    mongoose.connect(mongoUri, options);
    let db = mongoose.connection;

    UserModel.authenticate(userName, password, (err, user) => {
        if (err) {
            console.log(err); // Show real reason.
            callback(null, 'Wrong username or password!');
            return;
        }
        callback(null, 'Success!')
        // Use JWT so user stays logged in...
    });
};
