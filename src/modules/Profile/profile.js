import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { saveProfileRequest } from './actions';
import { loadFromLocalStore } from '../../localStore';

const profile = handleActions({
  [saveProfileRequest]: (_state, action) => {
    return {
      ..._state,
      ...action.payload
    }
  },
}, loadFromLocalStore('profile'));

export default combineReducers({
  profile
});

export const getProfile = state => state.profile;