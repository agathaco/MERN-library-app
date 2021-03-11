

import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthorById, deleteAuthor } from '../../actions/author';
import { getBooks } from '../../actions/book';

const Author = ({ getAuthorById, deleteAuthor, getBooks, authors:{author}, match, history }) => {
  useEffect(() => {
    getAuthorById(match.params.id);
    getBooks()
  }, [getAuthorById, match, getBooks]);

  const handleAuthorDelete = () => {
    deleteAuthor(author._id, history)
  }


  return (
  <Fragment>
    {author === null ? (
      <p>Loading...</p>
    ) : (
    <Fragment>
      <h2>{author.name}</h2>
      <p>{author.genre}</p>
      <p>{author.bio}</p>
      <h3>Books</h3>
      <p>Books by this author</p>
      <Link to={`/authors/edit/${author._id}`}>Edit</Link>
      <button onClick={handleAuthorDelete}>Delete</button>
      <Link to="/authors">Back to authors</Link>
    </Fragment>
    )}
    </Fragment>
  )
}

Author.propTypes = {
  getAuthorById: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    authors: state.authors
  }
};


export default connect(mapStateToProps, { getAuthorById, deleteAuthor, getBooks })(Author);

