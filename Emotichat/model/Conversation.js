const mongoose = require('mongoose');
const uuid = require('uuid/v4');

const ConversationSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },

    to: {
        type: String,
        required: true,
        trim: true
    },

    from: {
        type: String,
        required: true,
        trim: true
    }
});

ConversationSchema.pre('save', function(next) {
    let conversation = this;
    console.log("Inside Conversation.js: uid: " + conversation.uid);
    Conversation.findOne( {to: to, from : from})
    .exec((err, conversation) => {
        if (err) {
            return callback(err);
        }    
    });
    next();
});

let Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
