const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verifyToken");
const { newAuthorValidation } = require("./validation");
const Author = require("../models/Author");

// @route    GET api/authors
// @desc     Get all authors
// @access   Public
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route    GET api/authors/:id
// @desc     Get author by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate({
      path: 'books',
      model: 'Book'
   });
    if (!author) {
      return res.status(404).send("Author not found");
    }

    res.send(author);
  } catch (err) {
    console.error(err.message);

    // check for invalid ObjectId so we don't get a server error
    if (err.kind === "ObjectId") {
      return res.status(404).send("Author not found");
    }

    res.status(500).send("Server Error");
  }
});

// @route    POST api/authors
// @desc     Create or Update an author
// @access   Private
router.post("/", verifyToken, async (req, res) => {
  const { error } = newAuthorValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    let savedAuthor = {};
    const { id, name, bio, genre, country } = req.body;
    const authorFields = { id, name, bio, genre, country };
    const authorId = id ? id : new mongoose.Types.ObjectId();
    savedAuthor = await Author.findOneAndUpdate(
      { _id: authorId },
      { $set: authorFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.send(savedAuthor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/authors/:id
// @desc     Delete an author
// @access   Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).send("Author not found");
    }

    if (author.books.length) {
      return res.status(403).send("You cannot delete this author because it has been assigned to at least one book")
    } else {
      await author.remove();
      res.send("Author has been removed");
    }

    
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send("Author not found");
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
