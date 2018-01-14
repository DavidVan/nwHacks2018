const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MessageSchema = new mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
        required: true,
    },
    to: {
        type: String,
        required: true,
        trim: true,
    },
    from: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        unique: false,
        required: true,
        trim: false,
    }
});

MessageSchema.pre('save', function(next) {
    let message = this;
    console.log("Inside Message.js: Message: " + message.content);
    bcrypt.hash(message.content, 10, (err, hash) => {
        if (err) {
            return next(err);
        }  
        message.content = hash;
        next();
    });
});

let Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
