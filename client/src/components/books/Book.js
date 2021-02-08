import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBookById, deleteBook } from '../../actions/book';

const Book = ({ getBookById, deleteBook, books:{ book }, match, history }) => {
  useEffect(() => {
    getBookById(match.params.id);
  }, [getBookById, match]);

  const handleBookDelete = () => {
    deleteBook(book._id, history)
  }

  return (
  <Fragment>
    {book === null ? (
      <p>Loading...</p>
    ) : (
    <Fragment>
      <h2>{book.title}</h2>
      <h3>By {book.author}</h3>
      <p>{book.genre}</p>
      <p>{book.description}</p>
      <Link to={`/books/edit/${book._id}`}>Edit</Link>
      <button onClick={handleBookDelete}>Delete</button>
      <Link to="/books">Back to Books</Link>
    </Fragment>
    )}
    </Fragment>
  )
}

Book.propTypes = {
  getBookById: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  // book: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
};

export default connect(mapStateToProps, { getBookById, deleteBook })(Book);