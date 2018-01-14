const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const MessageModel = require('../model/Message');

/**
 * @param {string} uid The unique id of the conversation
 * @returns {any}
 */
module.exports = (uid, context, callback) => {
    var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect(mongoUri, function(err, db) {
        var dbo = db.db("test");
        if (err) {
            console.log(err); 
        }
        db.collection("messages").find( { uid: uid, read: true }).sort( { date: -1 } ).limit(100).toArray(function(err, result) {
                console.log(JSON.stringify(result));
                callback(null, result);
            });
        });
};
