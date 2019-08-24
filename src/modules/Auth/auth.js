import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { login, logout } from './actions';

const loggedIn = handleActions({
  [login]: () => true,
  [logout]: () => false
}, false);

export default combineReducers({
  loggedIn
});

export const getIsLoggedIn = state => state.auth.loggedIn;