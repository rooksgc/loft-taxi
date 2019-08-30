import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './index.css';
import createStore from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { initLocalStore } from './localStore';

initLocalStore();

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

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);