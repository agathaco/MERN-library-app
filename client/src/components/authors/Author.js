import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAuthorById, deleteAuthor } from "../../actions/author";

const Author = ({
  getAuthorById,
  deleteAuthor,
  authors: { author },
  match,
  history,
}) => {
  useEffect(() => {
    getAuthorById(match.params.id);
  }, [getAuthorById, match]);

  const handleAuthorDelete = () => {
    deleteAuthor(author._id, history);
  };

  return (
    <Fragment>
      {author === null ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <h2>{author.name}</h2>
          <p>{author.genre}</p>
          <p>{author.bio}</p>
          <div className="books">
            <h3>Books</h3>
            {author.books.map((book, index) => (
              <div key={index}>
                <Link to={`/books/${book._id}`}>
                  {book.title}
                </Link>
              </div>
            ))}
          </div>
          <Link to={`/authors/edit/${author._id}`}>Edit</Link>
          <button onClick={handleAuthorDelete}>Delete</button>
          <Link to="/authors">Back to authors</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Author.propTypes = {
  getAuthorById: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authors: state.authors,
  };
};

export default connect(mapStateToProps, {
  getAuthorById,
  deleteAuthor,
})(Author);
