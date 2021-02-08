import {
  GET_AUTHOR,
  GET_AUTHORS,
  AUTHOR_ERROR,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  CLEAR_AUTHOR
} from '../actions/types';

const initialState = {
  authors: [],
  author: null,
  loading: true,
  error: {}
};

const authorReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_AUTHORS:
      return {
        ...state,
        authors: payload,
        loading: false
      };
    case GET_AUTHOR:
      return {
        ...state,
        author: payload,
        loading: false
      };
    case ADD_AUTHOR:
      return {
        ...state,
        authors: [payload, ...state.authors],
        loading: false
      };
    case AUTHOR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_AUTHOR:
      return {
        ...state,
        author: null,
        loading: false
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter(author => author._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}

export default authorReducer;