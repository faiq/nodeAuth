var mongoose = require('mongoose'),
    schema = require('schema');
var User = new Schema ({
  username: String, 
  passwordHash: String
});
module.exports = mongoose.model('User', User);
