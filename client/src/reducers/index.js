import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import authors from './author';

export default combineReducers({
  alert,
  auth,
  profile,
  authors
});