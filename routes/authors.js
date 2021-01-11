const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken');
const { newAuthorValidation } = require('./validation');
const Author = require('../models/author')

// @route    GET api/authors
// @desc     Get all authors
// @access   Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/authors
// @desc     Create an author
// @access   Private
router.post(
  '/',
  verifyToken,
  async (req, res) => {
    const { error } = newAuthorValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    try {
      const newAuthor = new Author({
        name: req.body.name
      });
      const author = await newAuthor.save();
      res.send(author);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// All Authors Route
// router.get('/', (req, res) => {
//   // let searchOptions = {}
//   // if (req.query.name != null && req.query.name !== '') {
//   //   searchOptions.name = new RegExp(req.query.name, 'i')
//   // }
//   // try {
//   //   const authors = await Author.find(searchOptions)
//   //   res.render('authors/index', {
//   //     authors: authors,
//   //     searchOptions: req.query
//   //   })
//   // } catch {
//   //   res.redirect('/')
//   // }
//   res.render('authors/index')
// })

// New Author Route
// router.get('/new', (req, res) => {
//   res.render('authors/new', { author: new Author() })
// })

// // Create Author Route
// router.post('/', async (req, res) => {
//   const author = new Author({
//     name: req.body.name
//   })
//   try {
//     const newAuthor = await author.save()
//     // res.redirect(`authors/${newAuthor.id}`)
//     res.redirect(`authors`)
//   } catch {
//     res.render('authors/new', {
//       author: author,
//       errorMessage: 'Error creating Author'
//     })
//   }
// })

module.exports = router