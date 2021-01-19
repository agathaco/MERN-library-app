import React, { Fragment, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUpdateAuthor } from '../../actions/author';

const AddEditAuthor = ({authors:{author, loading}, addUpdateAuthor, history}) => {

  const isAddMode = author ? !author._id : true;
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!isAddMode) {
      setValue('name', author.name)
    }
  }, []);


  const onSubmit = data => {
    data.id = isAddMode ? null : author._id
    addUpdateAuthor(data, history, author ? true : false)
  };


  return (
    <Fragment>
      <h2>{isAddMode ? 'New Author' : 'Edit Author'}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" name="name" ref={register} required></input>
        <Link to="/authors">Cancel</Link>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  )
}

AddEditAuthor.propTypes = {
  addUpdateAuthor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authors: state.authors
  }
};

export default connect(mapStateToProps, { addUpdateAuthor })(withRouter(AddEditAuthor));
