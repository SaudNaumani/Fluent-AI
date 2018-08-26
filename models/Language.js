const mongoose = require('mongoose');
const { Schema } = mongoose

const languageSchema = new Schema({
  name: String,
  topics: [{
    name: String,
    picture: String,
    difficulty: String,
    questions: [{
      question: String
    }]
  }]
});

mongoose.model('languages', languageSchema);
