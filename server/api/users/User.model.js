var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  age: {
    type: Date,
    required: false
  }
});
// Compile model from schema
module.exports = UserModel = mongoose.model('UserModel', UserModelSchema);
