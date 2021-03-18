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
      <h3>By <Link to={`/authors/${book.author._id}`}>{book.author.name}</Link></h3>
      <p><Link to={`/genres/${book.genre._id}`}>{book.genre.name}</Link></p>
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
  console.log(state.book)
  return {
    books: state.books
  }
};

export default connect(mapStateToProps, { getBookById, deleteBook })(Book);