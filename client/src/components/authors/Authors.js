import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthors } from '../../actions/author';


const Authors = ({ getAuthors, authors: { authors } }) => {
  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  return (
    <Fragment>
      <h2>All authors </h2>
        <div className="authors">
        {authors.map((author, index) => (
          <Link to={`/authors/${author._id}`} key={index}>{author.name}</Link>
        ))}
      </div>
      <Link to="/new-author">New Author</Link>
    </Fragment>
  )
}

Authors.propTypes = {
  getAuthors: PropTypes.func.isRequired,
  authors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    authors: state.authors
  }
};


export default connect(mapStateToProps, { getAuthors })(Authors);
