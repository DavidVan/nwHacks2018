const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const MessageModel = require('../model/Message');

/**
* @param {string} to The user receiving message
* @param {string} from The user sending message
* @param {string} content The user's message
* @returns {any}
*/
module.exports = (to, from, content, context, callback) => {
    let mongoUri = process.env['MONGO_URI'];
    let options = {
        useMongoClient: true,
    }

    var uid = 1
    let message = new MessageModel({
        uid: uid,
        to: to,
        from: from,
        content: content,
    });

    mongoose.connect(mongoUri, options);
    let db = mongoose.connection;

    console.log("Message")
    console.log("To: " + message.to);
    console.log("From: " + message.from);
    console.log("Content: " + message.content);

    db.once('open', () => {
        console.log("Message: " + message);
        message.save()
            .then(() => {
                callback(null, `Message ${uid} created.`);
            })
            .catch((err) => {
                callback(null, `Message ${uid} not created. ${err}`);
            })
            .finally(() => {
                db.close();
            });
    });
};
