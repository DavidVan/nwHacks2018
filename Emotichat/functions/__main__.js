const uuid = require('uuid/v4');

/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {string}
*/
module.exports = (name = 'world', context, callback) => {

  console.log(uuid());
  callback(null, `hello ${name}`);

};


