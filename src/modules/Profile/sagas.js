import { takeEvery, call, fork } from 'redux-saga/effects';
import {
  saveProfileRequest,
} from './actions';
import { saveToLocalStore } from '../../localStore';

export function* saveProfileFlow(action) {
  try {
    yield call(saveToLocalStore, 'profile', action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* profileWatcher() {
  yield takeEvery(saveProfileRequest, saveProfileFlow);
}

export default function*() {
  yield fork(profileWatcher);
}
