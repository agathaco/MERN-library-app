import { SEARCH, CLEAR_SEARCH } from './types';

export const search = query => dispatch => {
  dispatch({
    type: SEARCH,
    payload: query
  });
};

export const clearSearch = () => dispatch => {
  console.log('clearing search')
  dispatch({
    type: CLEAR_SEARCH,
    payload: null
  });
};