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

    // it('Должен содержать кнопки "Карта", "Профиль" и "Войти", если пользователь не залогинился', () => {
      // const { getByTestId } = render(<Header />);
      // const element = getByTestId('header-text');
      // expect(element.tagName).toBe('H6');
      // expect(element.innerHTML).toBe('Loft Taxi');
    // });
  });

  // describe('Поведение компонента', () => {
  //   it('Клик по кнопке increment увеличивает значение счетчика на 1', () => {
  //     const { getByText, getByTestId } = render(<Counter />);
  //     fireEvent.click(getByText("Increment"));
  //     const counter = getByTestId('counter');
  //     expect(counter.innerHTML).toBe('1');
  //   });
  
  //   it('Клик по кнопке decrement уменьшает значение счетчика на 1', () => {
  //     const { getByText, getByTestId } = render(<Counter />);
  //     fireEvent.click(getByText("Decrement"));
  //     const counter = getByTestId('counter');
  //     expect(counter.innerHTML).toBe('-1');
  //   });
  // });

});
