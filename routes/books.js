const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verifyToken");
const { newBookValidation } = require("./validation");
const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
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
const booksData = require("../data/books.json");

// @route    GET api/books
// @desc     Get all books
// @access   Public
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name");
    if (books.length) res.send(books);
    if (!books.length) {
      // no books in the database yet
      // let's import them fron the books.json files
      const insertBooks = await Book.insertMany(booksData);
      // const newBooks = await Book.find();
      // saving new authors
      insertBooks.forEach(async (book) => {
        const author = await Author.findOne({ name: book.author });
        if (!author) {
          const newAuthor = new Author({
            name: book.author,
          });
          newAuthor.save();
        }
      });
      res.send(insertBooks);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/book/:id
// @desc     Get book by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author").populate("genre");
    if (!book) return res.status(404).send("Book not found");
    res.send(book);
  } catch (err) {
    console.error(err.message);

    // check for invalid ObjectId so we don't get a server error
    if (err.kind === "ObjectId") {
      return res.status(404).send("Book not found");
    }

    res.status(500).send("Server Error");
  }
});

// @route    POST api/books
// @desc     Create or Update a book
// @access   Private
router.post("/", verifyToken, async (req, res) => {
  const { error } = newBookValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const {
      id,
      title,
      author,
      description,
      publishDate,
      genre,
      coverImage,
    } = req.body;

    let authorId = author.__isNew__ ?  null : author.value;
    let genreId = genre.__isNew__ ?  null : genre.value;
    const bookId = id ? id : new mongoose.Types.ObjectId();

    // Check if author is new and store book id
    const bookAuthor = await Author.findOne({ _id: authorId })
    try {
      if (!bookAuthor) {
        const newAuthor = new Author({
          name: author.label,
          books: [bookId]
        })
        authorId = newAuthor._id;
        newAuthor.save();
      } else {
        if (!bookAuthor.books.includes(bookId)) bookAuthor.books.unshift(bookId)
        bookAuthor.save();
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("A server error occured");
    }

    // Check if genre is new and store book id
    const bookGenre = await Genre.findOne({ _id: genreId })
    try {
      if (!bookGenre) {
        const newGenre = new Genre({
          name: genre.label,
          books: [bookId]
        })
        genreId = newGenre._id;
        newGenre.save();
      } else {
        if (!bookGenre.books.includes(bookId)) bookGenre.books.unshift(bookId)
        bookGenre.save();
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("A server error occured when saving genre");
    }

    const bookFields = {
      id: bookId,
      title,
      author: authorId,
      genre: genreId,
      description,
      publishDate,
      coverImage,
    };
    const savedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { $set: bookFields },
      { new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: false }
    );
    res.send(savedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/books/:id
// @desc     Delete a book
// @access   Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    await book.remove();

    res.send("Book has been removed");
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send("Book not found");
    }
    return res.status(500).send("Server Error");
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

module.exports = router;
