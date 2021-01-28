import { SEARCH } from '../actions/types';

const searchReducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH:
      return {...state, query: payload};
    default:
      return state;
  }
}

export default searchReducer;