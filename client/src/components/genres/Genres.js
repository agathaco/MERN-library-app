import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGenres } from "../../actions/genre";

import SearchBar from "../layout/Searchbar";

const Genres = ({ getGenres, search, genres: { genres, loading } }) => {
  const [displayedGenres, setDisplayedGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  useEffect(() => {
    if (search.query) {
      const filteredGenres = genres.filter((genre) =>
        genre.name.toLowerCase().includes(search.query.toLowerCase())
      );
      setDisplayedGenres(filteredGenres);
    } else {
      setDisplayedGenres(genres);
    }
  }, [search.query, genres]);

  return (
    <Fragment>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Fragment>
          <h2>Search Genres</h2>
          <SearchBar placeholder="Search for a genre" />
          <h2>All Genres </h2>
          <div className="genres">
            {displayedGenres.map((genre, index) => (
              <div key={index}>
                <Link to={`/genres/${genre._id}`}>{genre.name}</Link>
              </div>
            ))}
          </div>
          <Link to="/new-genre" className="btn btn-dark">
            Add Genre
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Genres.propTypes = {
  getGenres: PropTypes.func.isRequired,
  genres: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
    search: state.search,
  };
};

export default connect(mapStateToProps, { getGenres })(Genres);
