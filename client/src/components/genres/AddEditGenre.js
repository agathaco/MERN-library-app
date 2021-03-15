import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUpdateGenre } from "../../actions/genre";
import { setAlert } from "../../actions/alert";

const AddEditGenre = ({
  genres: { genre, genres, loading },
  addUpdateGenre,
  history,
  setAlert
}) => {
  const isAddMode = genre ? !genre._id : true;
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!isAddMode) {
      setValue("name", genre.name)
    }
  }, [setValue, isAddMode, genre]);

  const onSubmit = (data) => {
    data.id = isAddMode ? null : genre._id;
    const doesGenreExist = genres.find((genre) => genre.name === data.name);
    if (doesGenreExist && isAddMode) {
      setAlert("This genre already exists", "danger");
    } else if (
      doesGenreExist &&
      !isAddMode &&
      doesGenreExist._id !== data.id
    ) {
      setAlert("This genre already exists", "danger");
    } else {
      addUpdateGenre(data, history, genre ? true : false);
    }
  };

  return (
    <Fragment>
      <h2>{isAddMode ? "Add Genre" : "Edit Genre"}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" name="name" ref={register} required></input>
        <Link to="/genres">Cancel</Link>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

AddEditGenre.propTypes = {
  addUpdateGenre: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
  };
};

export default connect(mapStateToProps, {
  addUpdateGenre,
  setAlert,
})(withRouter(AddEditGenre));
