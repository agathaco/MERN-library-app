const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verifyToken");
const { newGenreValidation } = require("./validation");
const Genre = require("../models/Genre");

// @route    GET api/genres
// @desc     Get all genres
// @access   Public
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route    GET api/genres/:id
// @desc     Get genre by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id).populate({
      path: 'books',
      model: 'Book',
      populate: {
        path: 'author',
        model: 'Author'
      } 
   });

    if (!genre) {
      return res.status(404).send("Genre not found");
    }
    res.send(genre);
  } catch (err) {
    console.error(err.message);

    // check for invalid ObjectId so we don't get a server error
    if (err.kind === "ObjectId") {
      return res.status(404).send("Genre not found");
    }

    res.status(500).send("Server Error");
  }
});

// @route    POST api/genres
// @desc     Create or Update a genre
// @access   Private
router.post("/", verifyToken, async (req, res) => {
  const { error } = newGenreValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    let savedGenre = {};
    const { id, name } = req.body;
    const genreId = id ? id : new mongoose.Types.ObjectId();
    savedGenre = await Genre.findOneAndUpdate(
      { _id: genreId },
      { $set: { name: name } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.send(savedGenre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/genres/:id
// @desc     Delete a genre
// @access   Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).send("Genre not found");
    }
    if (genre.books.length) {
      return res.status(403).send("You cannot delete this genre because it has been assigned to at least one book")
    } else {
      await genre.remove();
      res.send("Genre has been deleted");
    }

  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send("Genre not found");
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
