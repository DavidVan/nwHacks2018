const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('../model/User');

/**
* @param {string} userName The user's user name.
* @returns {any}
*/
module.exports = (userName, context, callback) => {
    let mongoUri = process.env['MONGO_URI'];
    let options = {
        useMongoClient: true,
    }

    mongoose.connect(mongoUri, options);
    let db = mongoose.connection;

    UserModel.getFriendsList(userName, (err, res) => {
        if (err) {
            console.log(err); // Show real reason.
            callback(null, 'Failed to find user!' + err);
            return;
        }
        callback(null, res);
    });
};
