const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const MessageModel = require('../model/Message');
const uuid = require('uuid/v4');

/**
* @param {string} to The user receiving the message
* @param {string} from The user sending the message
* @param {string} content The user's message
* @returns {any}
*/
module.exports = (to, from, content, context, callback) => {
    let mongoUri = process.env['MONGO_URI'];
    let options = {
        useMongoClient: true,
    }

    var MongoClient = require('mongodb').MongoClient;

    let uid = uuid();
    
    MongoClient.connect(mongoUri, function(err, db) {
        var dbo = db.db("test");
        if (err) {
            console.log(err); 
        }
        dbo.collection("conversations").findOne({to:to, from:from}, function(err, result) {
            if (!result) {
                console.log("Conversation not found, creating..."); 

                dbo.collection("conversations").insertOne({
                    uid: uid,
                    to: to,
                    from: from
                });
            } else {
                uid = result.uid; 
            }
        });
    });

    mongoose.connect(mongoUri, options);

    let db = mongoose.connection;

    let date = new Date();
    let message = new MessageModel({
        uid: uid,
        to: to,
        from: from,
        date: date,
        content: content,
    });

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
