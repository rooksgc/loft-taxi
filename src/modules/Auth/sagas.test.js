import { loginFlow, logoutFlow } from "./sagas";
import { call, put } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest
} from "./actions";
import { authRequest } from "./api";
import { saveToLocalStore } from '../../localStore';

describe("Тест саги auth", () => {

  describe("Тест последовательности loginFlow с верными авторизационными данными", () => {
    const payload = {
      username: 'test@test.com',
      password: '123123'
    };
    const { username, password } = payload;
    const iterator = loginFlow(loginRequest(payload));

    it("Первый yield - call(authRequest, username, password)", () => {
      expect(iterator.next().value).toEqual(
        call(authRequest, username, password)
      );
    });
  
    it("Второй yield - call(saveToLocalStore, 'loggedIn', true)", () => {
      expect(iterator.next('test_key').value).toEqual(
        call(saveToLocalStore, 'loggedIn', true)
      );
    });
  
    it("Третий yield - put( loginSuccess(action.payload) )", () => {
      expect(iterator.next("test_key").value).toEqual(
        put( loginSuccess(payload) )
      );
    });
  });

  describe("Тест последовательности loginFlow с ошибочными авторизационными данными", () => {
    const payload = {
      username: 'fake@data.com',
      password: '321321'
    };
    const { username, password } = payload;
    const iterator = loginFlow(loginRequest(payload));

    it("Первый yield - call(authRequest, username, password)", () => {
      expect(iterator.next().value).toEqual(
        call(authRequest, username, password)
      );
    });
  
    it("Второй yield - put( loginFailure(data.error) )", () => {
      expect(iterator.next().value).toEqual(
        put( loginFailure(payload) )
      );
    });
  });

  describe("Тест последовательности logoutFlow", () => {
    const iterator = logoutFlow(logoutRequest());

    it("Первый yield - call(saveToLocalStore, 'loggedIn', false)", () => {
      expect(iterator.next().value).toEqual(
        call(saveToLocalStore, 'loggedIn', false)
      );
    });
  });

});
