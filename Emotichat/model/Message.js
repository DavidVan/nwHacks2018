const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MessageSchema = new mongoose.Schema({
    uid: {
        type: String,
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
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Date,
        required: true,
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
    next();
});

let Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
