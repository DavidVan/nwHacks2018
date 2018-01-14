const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('../model/User');
const jwt = require('jsonwebtoken');

const secret = process.env['JWT_SECRET'];

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
        // Use JWT so user stays logged in...
        const userData = {
            userName: user.userName,
            email: user.email,
        }
        const token = {
            token: jwt.sign({ userData }, secret, {
                expiresIn: "30 days" // Expires in 30 days
            }),
        }

        callback(null, token, { 'Content-Type': 'application/json'});
    });
};
