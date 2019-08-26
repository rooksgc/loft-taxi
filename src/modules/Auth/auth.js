import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { login, logout } from './actions';
import { loadFromLocalStore, saveToLocalStore } from '../../localStore';

const loggedIn = handleActions({
  [login]: () => {
    saveToLocalStore('loggedIn', true);
    return true
  },
  [logout]: () => {
    saveToLocalStore('loggedIn', false);
    return false;
  }
}, loadFromLocalStore('loggedIn'));

export default combineReducers({
  loggedIn
});

export const getIsLoggedIn = state => state.auth.loggedIn;