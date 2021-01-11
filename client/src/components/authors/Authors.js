import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthors } from '../../actions/author';


const Authors = ({ getAuthors, author: { authors } }) => {
  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  return (
    <Fragment>
      <h2>All authors </h2>
        <div className="authors">
        {authors.map((author) => (
          <div>{author.name}</div>
        ))}
      </div>
      <Link to="/new-author">New Author</Link>
    </Fragment>
  )
}

Authors.propTypes = {
  getAuthors: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    author: state.author
  }
};


export default connect(mapStateToProps, { getAuthors })(Authors);
