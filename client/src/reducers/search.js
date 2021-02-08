import { SEARCH, CLEAR_SEARCH } from '../actions/types';

const searchReducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH:
      return {...state, query: payload};
    case CLEAR_SEARCH:
      return {...state, query: null};
    default:
      return state;
  }
}

export default searchReducer;