import axios from 'axios'
import { setAlert } from './alert';

import {
  GET_AUTHOR,
  GET_AUTHORS,
  AUTHOR_ERROR
} from './types';

// Get all authors
export const getAuthors = () => async dispatch => {
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
export const addAuthor = (formData, history) => async dispatch => {
  try {
    const res = await axios.post('api/authors', formData);

    dispatch({
      type: GET_AUTHOR,
      payload: res.data
    });

    dispatch(setAlert('Author added', 'success'));
    history.push('/authors');

  } catch (error) {
    // to do: test errors
    console.error(error)


    if (error.response.data) dispatch(setAlert(error.response.data, 'danger'))

    dispatch({
      type: AUTHOR_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


// Delete author
export const deleteAuthor = () => async dispatch => {
};