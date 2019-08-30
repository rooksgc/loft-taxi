import { handleActions } from 'redux-actions';
import { saveProfileRequest } from './actions';
import { loadFromLocalStore } from '../../localStore';

const profile = handleActions({
  [saveProfileRequest]: (_state, action) => {
    if (!action.payload) return null;
    return {
      ..._state,
      ...action.payload
    }
  },
}, loadFromLocalStore('profile'));

export default profile;

export const getProfile = state => state.profile;