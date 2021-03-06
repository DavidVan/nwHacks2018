const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const MessageModel = require('../model/Message');
const bcrypt = require('bcrypt');

/**
 * @param {string} id The unique id of the message
 * @returns {any}
 */
module.exports = (id, context, callback) => {
    let mongoUri = process.env['MONGO_URI'];

    var ObjectId = require('mongodb').ObjectId;
    var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect(mongoUri, function(err, db) {
        var dbo = db.db("test");
        if (err) {
            console.log(err); 
        }
        var myQuery = { "_id" : new ObjectId(id)};
        var newValues = { $set : { read : true } };
        dbo.collection("messages").updateOne(myQuery, newValues, function(err, res) {
            if (err) {
                console.log("Error: " + err); 
            } else {
                console.log("Marked " + id + " as read"); 
            }
        });
        dbo.collection("messages").findOne(myQuery, function(err, res) {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            console.log(res); 
            callback(null, res);
        });
    });
};
