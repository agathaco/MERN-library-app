import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthors } from '../../actions/author';

import SearchBar from "../layout/Searchbar";

const Authors = ({ getAuthors, search, authors: { authors, loading } }) => {

const [displayedAuthors, setDisplayedAuthors] = useState([])

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  useEffect(() => {
    if (search.query) {
      const filteredAuthors = authors.filter(author => author.name.toLowerCase().includes(search.query.toLowerCase()))
      setDisplayedAuthors(filteredAuthors)
    } else {
      setDisplayedAuthors(authors)
    }
  }, [search.query, authors]);

  return (
    <Fragment>
    {loading ? (
      <div>loading...</div>
    ) : (
    <Fragment>
      <h2>Search authors</h2>
      <SearchBar/>
      <h2>All authors </h2>
        <div className="authors">
        {displayedAuthors.map((author, index) => (
          <div key={index}><Link to={`/authors/${author._id}`} >{author.name}</Link></div>
        ))}
      </div>
      <Link to="/new-author" className="btn btn-dark">New Author</Link>
    </Fragment>
    )}
    </Fragment>
  )
}

Authors.propTypes = {
  getAuthors: PropTypes.func.isRequired,
  authors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    authors: state.authors,
    search: state.search
  }
};


export default connect(mapStateToProps, { getAuthors })(Authors);
