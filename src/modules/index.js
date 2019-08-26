import { combineReducers } from 'redux';
// import { fork } from 'redux-saga/effects';
import auth from './Auth';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  form: formReducer
});

export function* rootSaga() {
  // yield fork(roverSagas);
}
