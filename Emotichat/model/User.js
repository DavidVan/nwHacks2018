const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

UserSchema.statics.authenticate = (userName, password, callback) => {
    User.findOne({ userName: userName })
        .exec((err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                let err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user);
                }
                else {
                    let err = new Error('Wrong password!');
                    err.status = 401;
                    return callback(err);
                }
            });
        });
};

let User = mongoose.model('User', UserSchema);

module.exports = User;