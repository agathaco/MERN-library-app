import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAuthor } from '../../actions/author';

const NewAuthor = ({addAuthor, history}) => {

  const [author, setAuthor] = useState({});

  const onSubmit = e => {
    e.preventDefault();
    addAuthor(author, history)
  };

  const handleAuthorInput = (e) => {
    setAuthor({ ...author, name: e.target.value });
  }

  return (
    <Fragment>
      <h2>New Author</h2>
      <form className="form" onSubmit={onSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={author.name} onChange={handleAuthorInput} required></input>
      <a href="/authors">Cancel</a>
      <button type="submit">Create</button>
      </form>
    </Fragment>
  )
}

NewAuthor.propTypes = {
  addAuthor: PropTypes.func.isRequired,
};

export default connect(null, { addAuthor })(withRouter(NewAuthor));
