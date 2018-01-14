const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('../model/User');

/**
* @param {string} email The user's email
* @param {string} userName The user's user name.
* @param {string} password The user's password.
* @returns {any}
*/
module.exports = (email, userName, password, context, callback) => {
    let mongoUri = process.env['MONGO_URI'];
    let options = {
        useMongoClient: true,
    }

    let user = new UserModel({
        email: email,
        userName: userName,
        password: password,
    });

    mongoose.connect(mongoUri, options);
    let db = mongoose.connection;

    console.log("Pass: " + user.password);

    db.once('open', () => {
        console.log("User: " + user);
        user.save()
            .then(() => {
                callback(null, `User ${userName} created.`);
            })
            .catch((err) => {
                callback(null, `User ${userName} not created. ${err}`);
            })
            .finally(() => {
                db.close();
            });
    });
};
