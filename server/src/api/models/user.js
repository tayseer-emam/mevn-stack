const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_VALIDATOR = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { 
    type: String,
    required: true,
    unique: true,
    match: EMAIL_VALIDATOR
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String }
});

module.exports = mongoose.model('User', userSchema);