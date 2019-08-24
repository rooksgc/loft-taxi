import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import Header from './components/Header';
import './index.css';
import createStore from './store';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    htmlFontWeight: 400,
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#fff',
      dark: '#006db3',
      contrastText: '#000'
    },
  },
});

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Header />
      <Router />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);