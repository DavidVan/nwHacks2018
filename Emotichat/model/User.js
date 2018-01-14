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
    },
    friendsList: [
        {
            type: String,
            unique: true,
            trim: true,
        }
    ],
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

UserSchema.statics.findFriend = (friend, callback) => { // Only returns user names...
    User.findOne({ friendsList: { $elemMatch: {friend} } })
        .exec((err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                let err = new Error('User not found');
                err.status = 401;
                return callback(err);
            }
            callback(null, friend);
        });
};

UserSchema.statics.getFriendsList = (userName, callback) => {
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
            callback(null, user.friendsList);
        });
};

UserSchema.statics.addFriend = (userName, friendName, callback) => {
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
            User.findOne({ userName: friendName })
                .exec((err, friend) => {
                    if (err) {
                        return callback(err);
                    }
                    if (!friend) {
                        let err = new Error('User not found');
                        err.status = 401;
                        return callback(err);
                    }
                    let userFriendsList = user.friendsList;
                    let friendsFriendList = friend.friendsList;
                    userFriendsList.push(friendName);
                    friendsFriendList.push(userName);
                    console.log("UserName's Friends List: " + userFriendsList);
                    console.log("Friend's Friend List: " + friendsFriendList);
                    User.findOneAndUpdate({ userName: userName }, { $set: { friendsList: userFriendsList} }, (err, res) => {
                        User.findOneAndUpdate({ userName: friendName }, { $set: { friendsList: friendsFriendList} }, (err, res) => {
                            callback(null, userFriendsList);
                        });
                    });
                });
        });
};

let User = mongoose.model('User', UserSchema);

module.exports = User;