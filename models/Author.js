const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  genre: String,
  country: String,
  website: String
})

module.exports = mongoose.model('Author', AuthorSchema);