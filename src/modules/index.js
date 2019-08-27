import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import auth, { sagas as authSagas } from './Auth';
import profile from './Profile';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  profile,
  form: formReducer
});

export function* rootSaga() {
  yield fork(authSagas);
}
