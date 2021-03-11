import React, { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUpdateBook } from "../../actions/book";
import { setAlert } from "../../actions/alert";
import { getAuthors } from "../../actions/author";

import Creatable, { makeCreatableSelect } from "react-select/creatable";
import Select from "react-select";

const AddEditBook = ({
  books: { book, books, loading },
  authors: { authors },
  getAuthors,
  addUpdateBook,
  history,
}) => {
  const isAddMode = book ? !book._id : true;
  const { register, handleSubmit, setValue, control } = useForm();
  const [ authorOptions, setAuthorOptions ] = useState([]);

  useEffect(() => {
    if (!isAddMode) {
      const fields = ["title", "author", "description", "genre", "date"];
      fields.forEach((field) => {
        if (field === "author") {
          const currentAuthor = authorOptions.find(authorOption => authorOption.value === book.author)
          setValue(field, currentAuthor)
        } else {
          setValue(field, book[field]);
        }
      });
    }
  }, [setValue, isAddMode, book, authorOptions]);

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  useEffect(() => {
    const options = authors.map((author) => {
      return {
        value: author._id,
        label: author.name,
      };
    });
    setAuthorOptions(options);



  }, [authors]);

  const onSubmit = (data) => {
    data.id = isAddMode ? null : book._id;
    const doesBookExist = books.find((book) => book.title === data.title);
    if (doesBookExist && isAddMode) {
      setAlert("This book already exists", "danger");
    } else if (
      doesBookExist &&
      !isAddMode &&
      doesBookExist._id !== data.id
    ) {
      setAlert("This book already exists", "danger");
    } else {
      addUpdateBook(data, history, book ? true : false);
    }
  };

  return (
    <Fragment>
      <h2>{isAddMode ? "Add Book" : "Edit Book"}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input type="text" name="title" ref={register} required></input>
        <label>Author</label>
        <Controller
          as={Creatable}
          options={authorOptions}
          name="author"
          control={control}
        />
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
  );
};

AddEditBook.propTypes = {
  addUpdateBook: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
    authors: state.authors,
  };
};

export default connect(mapStateToProps, {
  addUpdateBook,
  setAlert,
  getAuthors,
})(withRouter(AddEditBook));
