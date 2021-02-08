const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const verifyToken = require('../middleware/verifyToken')
const { newBookValidation } = require('./validation')
const Book = require('../models/book')
const Author = require('../models/author')
// const multer = require('multer')
// const path = require('path')
// const fs = require('fs')
// const uploadPath = path.join('public', Book.coverImageBasePath)
// const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
// const upload = multer({
//   dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype))
//   }
// })
const booksData = require('../data/books.json');


// @route    GET api/books
// @desc     Get all books
// @access   Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length) res.send(books);
    if (!books.length) {
       // no books in the database yet
      // let's import them fron the books.json files
      const insertBooks = await Book.insertMany(booksData)
      // const newBooks = await Book.find();
      // saving new authors
      insertBooks.forEach(async book => {
        const author = await Author.findOne({name: book.author})
        if (!author) {
          const newAuthor = new Author({
            name: book.author
          })
          newAuthor.save()
        };
      })
      res.send(insertBooks)
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/book/:id
// @desc     Get book by ID
// @access   Public
router.get('/:id',  async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found')
    res.send(book);
  } catch (err) {
    console.error(err.message);

    // check for invalid ObjectId so we don't get a server error
    if (err.kind === 'ObjectId') {
      return res.status(404).send('Book not found')
    }

    res.status(500).send('Server Error');
  }
});

// @route    POST api/books
// @desc     Create or Update a book
// @access   Private
router.post(
  '/',
  verifyToken,
  async (req, res) => {
    const { error } = newBookValidation(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    try {
      let savedBook = {};
      const {id, title, author, description, publishDate, genre, coverImage} = req.body;
      const bookFields = {id, title, author, description, publishDate, genre, coverImage}
      console.log(88, bookFields)
      const bookId = id ? id : new mongoose.Types.ObjectId();
      // TO DO: SAVE AUTHOR IF NEW
      savedBook = await Book.findOneAndUpdate(
        {_id: bookId}, 
        {$set: bookFields}, 
        {new: true, upsert: true, setDefaultsOnInsert: true }
        )
      res.send(savedBook);
      console.log('saved book', savedBook)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/books/:id
// @desc     Delete a book
// @access   Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    await book.remove();

    res.send('Book has been removed');
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).send('Book not found')
    }
    return res.status(500).send('Server Error');
  }
});

// // New Book Route
// router.get('/new', async (req, res) => {
//   try {
//     const authors = await Author.find({})
//     const book = new Book();
//     const params = {
//       authors: authors,
//       book: book
//     }
//     // if (hasError) params.errorMessage = 'Error Creating Book'
//     res.render('books/new', params)
//   } catch {
//     res.redirect('/books')
//   }
// })

// // Create Book Route
// router.post('/', async (req, res) => {
//   const book = new Book({
//     title: req.body.title,
//     author: req.body.author,
//     publishDate: new Date(req.body.publishDate),
//     pageCount: req.body.pageCount,
//     coverImageName: fileName,
//     description: req.body.description
//   })
//   try {
//     const newBook = await book.save()
//     // res.redirect(`books/${newBook.id}`)
//     res.redirect(`books`)
//   } catch {

//   }
// })

module.exports = router