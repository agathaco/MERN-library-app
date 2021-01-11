import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import author from './author';

export default combineReducers({
  alert,
  auth,
  profile,
  author
});