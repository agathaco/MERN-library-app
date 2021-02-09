const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  genre: String,
  country: String,
  website: String,
  books: Array
})

module.exports = mongoose.model('author', AuthorSchema);