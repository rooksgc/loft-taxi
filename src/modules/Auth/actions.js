import { createAction } from 'redux-actions';

export const loginRequest = createAction('AUTH/LOGIN_REQUEST');
export const loginSuccess = createAction('AUTH/LOGIN_SUCCESS');
export const loginFailure = createAction('AUTH/LOGIN_FAILURE');
export const logoutRequest = createAction('AUTH/LOGOUT_REQUEST');