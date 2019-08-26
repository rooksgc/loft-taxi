import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { saveProfile } from './actions';
import { loadFromLocalStore, saveToLocalStore } from '../../localStore';

const profile = handleActions({
  [saveProfile]: (_state, action) => {
    
    // todo - saveToLocalStore => to saga
    saveToLocalStore('profile', action.payload);

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