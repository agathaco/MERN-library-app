const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
  },
  genre: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImageName: {
    type: String,
  }
})

module.exports = mongoose.model('book', BookSchema);