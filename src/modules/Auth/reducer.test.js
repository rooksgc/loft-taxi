import reducer, { getIsLoggedIn, getAuthError } from "./auth";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest
} from "./actions";

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
};

describe("Тест редьюсера auth", () => {
  const state0 = reducer(undefined, randomAction);

  it("В редьюсере определены поля loggedIn и authError", () => {
    expect(state0.loggedIn).toBeDefined();
    expect(state0.authError).toBeDefined();
  });

  it("loginRequest ставит поле loggedIn в false", () => {
    const state1 = reducer(state0, loginRequest());
    expect(state1.loggedIn).toBe(false);
    expect(state1.authError).toBe("");
  });

  it("loginSuccess ставит поле loggedIn в true", () => {
    const state1 = reducer(state0, loginSuccess());
    expect(state1.loggedIn).toBe(true);
    expect(state1.authError).toBe("");
  });

  it("logoutRequest ставит поле loggedIn в false, очищает поле authError", () => {
    const state1 = reducer(state0, logoutRequest());
    expect(state1.loggedIn).toBe(false);
    expect(state1.authError).toBe("");
  });

  it("loginFailure ставит поле loggedIn в false, payload передается в authError", () => {
    const payload = "Неверное имя пользователя";
    const state1 = reducer(state0, loginFailure(payload));
    expect(state1.loggedIn).toBe(false);
    expect(state1.authError).toBe(payload);
  });

  it("Селектор getIsLoggedIn возвращает значение поля loggedIn", () => {
    const state1 = reducer(state0, loginSuccess());
    const currentLoggedIn = getIsLoggedIn({auth: state1});
    expect(state1.loggedIn).toBe(currentLoggedIn);
  });

  it("Селектор getAuthError возвращает значение поля authError", () => {
    const payload = "Неверный пароль";
    const state1 = reducer(state0, loginFailure(payload));
    const currentAuthError = getAuthError({auth: state1});
    expect(state1.authError).toBe(currentAuthError);
  });
});
