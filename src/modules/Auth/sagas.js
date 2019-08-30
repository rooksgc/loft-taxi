import { takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest
} from './actions';
import { authRequest } from './api';
import { saveToLocalStore } from '../../localStore';

export function* loginFlow(action) {
  try {
    const { username, password } = action.payload;
    const data = yield call(authRequest, username, password);
    if (!data.error) {
      yield call(saveToLocalStore, 'loggedIn', true);
      yield put( loginSuccess(action.payload) );
    } else {
      yield put( loginFailure(data.error) );
    }
  } catch (error) {
    yield put( loginFailure(action.payload) );
  }
}

export function* logoutFlow() {
  try {
    yield call(saveToLocalStore, 'loggedIn', false);
  } catch (error) {
    console.log(error);
  }
}

function* authWatcher() {
  yield takeEvery(loginRequest, loginFlow);
  yield takeEvery(logoutRequest, logoutFlow);
}

export default function* () {
  yield fork(authWatcher);
}
