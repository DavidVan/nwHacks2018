const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('../model/User');

/**
* @param {string} userName The user's user name.
* @param {string} friend The friend to add
* @returns {any}
*/
module.exports = (userName, friend, context, callback) => {
    let mongoUri = process.env['MONGO_URI'];
    let options = {
        useMongoClient: true,
    }

    mongoose.connect(mongoUri, options);
    let db = mongoose.connection;

    UserModel.addFriend(userName, friend, (err, res) => {
        if (err) {
            console.log(err); // Show real reason.
            callback(null, 'Failed to add friend!' + err);
            return;
        }
        callback(null, res);
    });
};
