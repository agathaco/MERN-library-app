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
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

module.exports = mongoose.model('Author', AuthorSchema);