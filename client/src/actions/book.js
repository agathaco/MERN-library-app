import axios from 'axios'
import { setAlert } from './alert';

import {
  GET_BOOK,
  GET_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  CLEAR_BOOK,
  BOOK_ERROR
} from './types';

// Get all books
export const getBooks = () => async dispatch => {
  dispatch({ type: CLEAR_BOOK });
  try {
    const res = await axios.get('api/books');

    dispatch({
      type: GET_BOOKS,
      payload: res.data
    });

  } catch (error) {
    console.log('error', error)
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get book by ID
export const getBookById = bookId => async dispatch => {
  try {
    const res = await axios.get(`/api/books/${bookId}`);
    dispatch({
      type: GET_BOOK,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      // to do: test errors
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add or update book
export const addUpdateBook = (formData, history, edit = false) => async dispatch => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('api/books', formData, config);

    dispatch({
      type: ADD_BOOK,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Book Updated' : 'Book Added', 'success'));
    history.push('/books');
    dispatch({ type: CLEAR_BOOK });

  } catch (error) {
    console.error(error)

    if (error.response.data) dispatch(setAlert(error.response.data, 'danger'))

    dispatch({
      type: BOOK_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete book
export const deleteBook= (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/books/${id}`);

    dispatch({
      type: DELETE_BOOK,
      payload: id
    });

    dispatch(setAlert('Book has been deleted', 'success'));
    history.push('/books');

  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
