const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  language: String
});

mongoose.model('users', userSchema);
