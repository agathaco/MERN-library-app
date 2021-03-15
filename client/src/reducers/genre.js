import {
  GET_GENRE,
  GET_GENRES,
  GENRE_ERROR,
  ADD_GENRE,
  DELETE_GENRE,
  CLEAR_GENRE,
} from "../actions/types";

const initialState = {
  genres: [],
  genre: null,
  loading: true,
  error: {},
};

const genreReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
        loading: false,
      };
    case GET_GENRE:
      return {
        ...state,
        genre: payload,
        loading: false,
      };
    case ADD_GENRE:
      return {
        ...state,
        genres: [payload, ...state.genres],
        loading: false,
      };
    case GENRE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_GENRE:
      return {
        ...state,
        genre: null,
        loading: false,
      };
    case DELETE_GENRE:
      return {
        ...state,
        genres: state.genres.filter((genre) => genre._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default genreReducer;
