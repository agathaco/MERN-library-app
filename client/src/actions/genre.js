import axios from 'axios'
import { setAlert } from './alert';

import {
  GET_GENRE,
  GET_GENRES,
  ADD_GENRE,
  DELETE_GENRE,
  CLEAR_GENRE,
  GENRE_ERROR
} from './types';

// Get all genres
export const getGenres = () => async dispatch => {
  dispatch({ type: CLEAR_GENRE });
  try {
    const res = await axios.get('api/genres');
    dispatch({
      type: GET_GENRES,
      payload: res.data
    });
  } catch (error) {
    console.log(error, error.response)
    dispatch({
      type: GENRE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get genre by ID
export const getGenreById = genreId => async dispatch => {
  try {
    const res = await axios.get(`/api/genres/${genreId}`);

    dispatch({
      type: GET_GENRE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GENRE_ERROR,
      // to do: test errors
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add or update genre
export const addUpdateGenre = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('api/genres', formData, config);

    dispatch({
      type: ADD_GENRE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Genre Updated' : 'Genre Created', 'success'));
    history.push('/genres');
    dispatch({ type: CLEAR_GENRE });

  } catch (error) {
    if (error.response.data) dispatch(setAlert(error.response.data, 'danger'))
    dispatch({
      type: GENRE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete genre
export const deleteGenre = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/genres/${id}`);

    dispatch({
      type: DELETE_GENRE,
      payload: id
    });

    dispatch(setAlert('Genre has been deleted', 'success'));
    history.push('/genres');

  } catch (err) {
    dispatch({
      type: GENRE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
