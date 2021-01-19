import axios from 'axios'
import { setAlert } from './alert';

import {
  GET_AUTHOR,
  GET_AUTHORS,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  CLEAR_AUTHOR,
  AUTHOR_ERROR
} from './types';

// Get all authors
export const getAuthors = () => async dispatch => {
  dispatch({ type: CLEAR_AUTHOR });

  try {
    const res = await axios.get('api/authors');

    dispatch({
      type: GET_AUTHORS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


// Get author by ID
export const getAuthorById = authorId => async dispatch => {
  try {
    const res = await axios.get(`/api/authors/${authorId}`);


    dispatch({
      type: GET_AUTHOR,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_ERROR,
      // to do: test errors
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add or update author
export const addUpdateAuthor = (formData, history, edit = false) => async dispatch => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('api/authors', formData, config);

    dispatch({
      type: ADD_AUTHOR,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Author Updated' : 'Author Created', 'success'));
    history.push('/authors');
    dispatch({ type: CLEAR_AUTHOR });


  } catch (error) {
    console.error(error)

    if (error.response.data) dispatch(setAlert(error.response.data, 'danger'))

    dispatch({
      type: AUTHOR_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


// Delete author
export const deleteAuthor = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/authors/${id}`);

    dispatch({
      type: DELETE_AUTHOR,
      payload: id
    });

    dispatch(setAlert('Author has been deleted', 'success'));
    history.push('/authors');

  } catch (err) {
    dispatch({
      type: AUTHOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
