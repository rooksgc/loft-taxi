import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addKey } from './actions';

const apiKey = handleActions({
  [addKey]: (_state, action) => action.payload
}, true);

export default combineReducers({
  apiKey
});

export const getIsAuthorized = state => state.auth.apiKey !== false;
export const getApiKey = state => state.auth.apiKey;