import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest
} from './actions';
import { loadFromLocalStore } from '../../localStore';

const loggedIn = handleActions({
  [loginRequest]: () => false,
  [loginSuccess]: () => true,
  [loginFailure]: () => false,
  [logoutRequest]: () => false
}, loadFromLocalStore('loggedIn'));

const authError = handleActions({
  [loginRequest]: (_state) => '',
  [loginSuccess]: () => '',
  [loginFailure]: (_state, action) => action.payload,
  [logoutRequest]: () => ''
}, '');

export default combineReducers({
  loggedIn,
  authError
});

export const getIsLoggedIn = state => state.auth.loggedIn;
export const getAuthError = state => state.auth.authError;