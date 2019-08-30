import reducer, { getProfile } from './profile';
import { saveProfileRequest } from './actions';

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
};

describe("Тест редьюсера profile", () => {
  const state0 = reducer(undefined, randomAction);
  const payload = {
    cardName: 'CARD HOLDER',
    cvv: '111',
    cardNumber: '6547 8521 4598 6321',
    expDate: '2020-10-01'
  };

  it("Начальное значение редьюсера равно null", () => {
    expect(state0).toBeNull();
  });

  it("Action saveProfileRequest заполняет значение profile из объекта payload", () => {
    const state1 = reducer(state0, saveProfileRequest(payload));
    expect(state1).toEqual(payload);
  });

  it("Если payload = null, то поле profile в state не меняется", () => {
    const payload = null;
    const state1 = reducer(state0, saveProfileRequest(payload));
    expect(state1).toEqual(state0);
  });

  it("Селектор getProfile возвращает текущее значение профиля", () => {
    const state1 = reducer(state0, saveProfileRequest(payload));
    const currentProfile = getProfile(state1);
    expect(state1.profile).toBe(currentProfile);
  });
});
