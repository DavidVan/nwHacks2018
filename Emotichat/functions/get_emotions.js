const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const UserModel = require('../model/User');
const fetch = require('node-fetch');

/**
* @param {string} photo The user's photo
* @returns {any}
*/
module.exports = (photo, context, callback) => {
    const faceAPIKey = process.env['FACE_API_KEY'];
    const endpoint = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion';

    const imageUrl = {
        'url': photo,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': faceAPIKey,
        },
        body: JSON.stringify(imageUrl) // image URL
    };

    fetch(endpoint, options)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            callback(null, json[0].faceAttributes.emotion);
        });
};
