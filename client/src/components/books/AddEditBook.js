import React, { Fragment, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUpdateBook} from '../../actions/book';

const AddEditBook = ({books:{book, loading}, addUpdateBook, history}) => {

  const isAddMode = book ? !book._id : true;
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!isAddMode) {
      const fields = ['title', 'author', 'description', 'genre', 'date'];
      fields.forEach(field => setValue(field, book[field]));
    }
  }, [setValue, isAddMode, book]);


  const onSubmit = data => {
    data.id = isAddMode ? null : book._id
    addUpdateBook(data, history, book ? true : false)
  };


  return (
    <Fragment>
      <h2>{isAddMode ? 'Add Book' : 'Edit Book'}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input type="text" name="title" ref={register} required></input>
        <label>Author</label>
        <input type="text" name="author" ref={register} required></input>
        <label>Description</label>
        <input type="text" name="description" ref={register}></input>
        <label>Genre</label>
        <input type="text" name="genre" ref={register}></input>
        <label>Publish Date</label>
        <input type="text" name="date" ref={register}></input>
        <Link to="/books">Cancel</Link>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  )
}

AddEditBook.propTypes = {
  addUpdateBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
};

export default connect(mapStateToProps, { addUpdateBook })(withRouter(AddEditBook));
