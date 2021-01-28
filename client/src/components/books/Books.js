import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooks } from '../../actions/book';

import SearchBar from "../layout/Searchbar";

const Books = ({ getBooks, search, books: { books } }) => {

const [displayedBooks, setDisplayedBooks] = useState([])

  useEffect(() => {
    const getDisplayedBooks = () => {
      if (search.query) {
        const filteredBooks = books.filter(book => book.name.toLowerCase().includes(search.query.toLowerCase()))
        setDisplayedBooks(filteredBooks)
      } else {
        setDisplayedBooks(books)
      }
    }
    getBooks();
    getDisplayedBooks();
  }, [getBooks, search, books]);

  return (
    <Fragment>
      <h2>Search Books</h2>
      <SearchBar/>
      <h2>All Books </h2>
        <div className="books">
        {displayedBooks.map((book, index) => (
          <div key={index}><Link to={`/books/${book._id}`} >{book.title} - {book.author}</Link></div>
        ))}
      </div>
      <Link to="/new-book" className="btn btn-dark">Add Book</Link>
    </Fragment>
  )
}

Books.propTypes = {
  getBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
    search: state.search
  }
};


export default connect(mapStateToProps, { getBooks })(Books);
