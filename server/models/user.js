const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    name: String,
    required: true
  },
  lastName : {
    name: String,
    required: true
  },
  email: {
    name: String,
    required: true
  },
  password: {
    name: String,
    required: true
  },
  designation: {
    name: String,
    required: true
  }
});

const User = model('User', userSchema);

module.exports = { userSchema, User };