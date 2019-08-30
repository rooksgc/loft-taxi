import { saveProfileFlow } from "./sagas";
import { call } from "redux-saga/effects";
import { saveProfileRequest } from "./actions";
import { saveToLocalStore } from '../../localStore';

describe("Тест саги profile", () => {
  describe("Тест последовательности saveProfileFlow", () => {
    const payload = {
      cardName: 'CARD HOLDER',
      cvv: '000',
      cardNumber: '1234 5678 9101 1121',
      expDate: '2022-05-01'
    };
    const iterator = saveProfileFlow(saveProfileRequest(payload));

    it("Вызов yield - call(saveToLocalStore, 'profile', action.payload)", () => {
      expect(iterator.next().value).toEqual(
        call(saveToLocalStore, 'profile', payload)
      );
    });
  });
});
