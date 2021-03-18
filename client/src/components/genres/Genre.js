import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGenreById, deleteGenre } from "../../actions/genre";

const Genre = ({
  getGenreById,
  deleteGenre,
  genres: { genre },
  match,
  history,
}) => {
  useEffect(() => {
    getGenreById(match.params.id);
  }, [getGenreById, match]);

  const handleGenreDelete = () => {
    deleteGenre(genre._id, history);
  };

  return (
    <Fragment>
      {genre === null ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <h2>{genre.name}</h2>
          <div className="books">
          <h3>Books</h3>
          {genre.books.map((book, index) => (
            <div key={index}>
              <Link to={`/books/${book._id}`}>
                {book.title} - {book.author.name}
              </Link>
            </div>
          ))}
        </div>
          <Link to={`/genres/edit/${genre._id}`}>Edit</Link>
          <button onClick={handleGenreDelete}>Delete</button>
          <Link to="/genres">Back to Genres</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Genre.propTypes = {
  getGenreById: PropTypes.func.isRequired,
  deleteGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
  };
};

export default connect(mapStateToProps, { getGenreById, deleteGenre })(Genre);
