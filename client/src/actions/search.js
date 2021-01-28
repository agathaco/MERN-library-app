import { SEARCH } from './types';

export const search = (query) => dispatch => {
  dispatch({
    type: SEARCH,
    payload: query
  });
};