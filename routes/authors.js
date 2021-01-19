const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken');
const { newAuthorValidation } = require('./validation');
const Author = require('../models/author');

// @route    GET api/authors
// @desc     Get all authors
// @access   Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg: 'Server Error'});
  }
});

// @route    GET api/authors/:id
// @desc     Get author by ID
// @access   Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({ msg: 'Author not found' })
    }

    res.json(author);
  } catch (err) {
    console.error(err.message);

    // check for invalid ObjectId so we don't get a server error
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Author not found' })
    }

    res.status(500).json({msg: 'Server Error'});
  }
});

// @route    POST api/authors
// @desc     Create or Update an author
// @access   Private
router.post(
  '/',
  verifyToken,
  async (req, res) => {
    const { error } = newAuthorValidation(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    try {
      let savedAuthor = {};
      if (req.body.id) {
        const author = await Author.findOne({_id: req.body.id})
        if (author) {
          // Update author
          savedAuthor = await Author.findOneAndUpdate({_id: req.body.id}, {$set: {"name":req.body.name}}, {new: true})
        } else {
          res.status(500).json({msg: 'Author not found'});
        }
      } else {
        // Create author
        const newAuthor = new Author({
          name: req.body.name
        });
        savedAuthor = await newAuthor.save();
      }
      res.send(savedAuthor);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({msg: 'Server Error'});
    }
  }
);

// @route    DELETE api/authors/:id
// @desc     Delete an author
// @access   Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ msg: 'Author not found' });
    }

    await author.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Author not found' })
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

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