import React, { Fragment, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUpdateAuthor } from '../../actions/author';
import { setAlert } from '../../actions/alert';


const AddEditAuthor = ({authors:{authors, author, loading}, addUpdateAuthor, setAlert, history}) => {
  const isAddMode = author ? !author._id : true;
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!isAddMode) {
      const fields = ['name', 'bio', 'genre', 'country'];
      fields.forEach(field => setValue(field, author[field]));
    }
  }, [isAddMode, setValue, author]);

  const onSubmit = data => {
    data.id = isAddMode ? null : author._id
    const doesAuthorExist = authors.find(author => author.name === data.name)
    if (doesAuthorExist && isAddMode) {
      setAlert('This author already exists', 'danger')
    } else if ((doesAuthorExist && !isAddMode && doesAuthorExist._id !== data.id)) {
      setAlert('This author already exists', 'danger')
    } else {
      addUpdateAuthor(data, history, author ? true : false)
    }
  };


  return (
    <Fragment>
      <h2>{isAddMode ? 'New Author' : 'Edit Author'}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" name="name" ref={register} required></input>
        <label>Bio</label>
        <input type="text" name="bio" ref={register}></input>
        <label>Genre</label>
        <input type="text" name="genre" ref={register}></input>
        <label>Country</label>
        <input type="text" name="country" ref={register}></input>
        <Link to="/authors">Cancel</Link>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  )
}

AddEditAuthor.propTypes = {
  addUpdateAuthor: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authors: state.authors
  }
};

export default connect(mapStateToProps, { addUpdateAuthor, setAlert })(withRouter(AddEditAuthor));
