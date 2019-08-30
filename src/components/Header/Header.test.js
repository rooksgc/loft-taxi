import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ConnectedHeader, { Header } from './Header';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

describe('Тест компонента Header', () => {
  describe('Рендер компонента', () => {
    it('Рендер проходит без ошибок', () => {
      const container = document.createElement('div');
      ReactDOM.render(<BrowserRouter><Header /></BrowserRouter>, container);
      ReactDOM.unmountComponentAtNode(container);
    });
  });

  describe('Состояние компонента', () => {
    it('Должен содержать элемент с текстом "Loft Taxi"', () => {
      const { getByTestId } = render(<BrowserRouter><Header /></BrowserRouter>);
      const element = getByTestId('header-text');
      expect(element.tagName).toBe('H6');
      expect(element.innerHTML).toBe('Loft Taxi');
    });

    it('Должен содержать кнопки "Карта", "Профиль" и "Войти", для неавторизованного пользователя', () => {
      const { getByTestId } = render(<BrowserRouter><Header isLoggedin={false} /></BrowserRouter>);
      expect(getByTestId('header-button-map')).toBeDefined();
      expect(getByTestId('header-button-profile')).toBeDefined();
      expect(getByTestId('header-button-login')).toBeDefined();
    });

    it('Должен содержать кнопки "Карта", "Профиль" и "Выйти", для авторизованного пользователя', () => {
      const { getByTestId } = render(<BrowserRouter><Header isLoggedin={true} /></BrowserRouter>);
      expect(getByTestId('header-button-map')).toBeDefined();
      expect(getByTestId('header-button-profile')).toBeDefined();
      expect(getByTestId('header-button-logout')).toBeDefined();
    });
  });
});
