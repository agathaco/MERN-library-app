import {
  GET_BOOK,
  GET_BOOKS,
  BOOK_ERROR,
  ADD_BOOK,
  DELETE_BOOK,
  CLEAR_BOOK
} from '../actions/types';

const initialState = {
  books: [],
  book: null,
  loading: true,
  error: {}
};

const bookReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        books: payload,
        loading: false
      };
    case GET_BOOK:

      return {
        ...state,
        book: payload,
        loading: false
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [payload, ...state.books],
        loading: false
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_BOOK:
      return {
        ...state,
        book: null,
        loading: false
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}

export default bookReducer;