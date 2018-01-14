const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('../model/User');
const jwt = require('jsonwebtoken');

const secret = process.env['JWT_SECRET'];

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
        keepAlive: 30000,
    }

    let user = new UserModel({
        email: email,
        userName: userName,
        password: password,
        friendsList: [],
    });

    mongoose.connect(mongoUri, options);
    let db = mongoose.connection;

    db.once('open', () => {
        user.save()
            .then(() => {
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
            })
            .catch((err) => {
                callback(null, `User ${userName} not created. ${err}`);
            })
            .finally(() => {
                db.close();
            });
    });
};
