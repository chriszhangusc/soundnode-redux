import 'isomorphic-fetch';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import deepOrange from '@material-ui/core/colors/deepOrange';

import configureStore from '@soundnode-redux/client/src/app/store/configureStore';
import App from '@soundnode-redux/client/src/app/layout/App';
import theme from '@soundnode-redux/client/src/app/css/theme';

const isProduction = process.env.NODE_ENV === 'production';

const HOST = isProduction
  ? 'https://soundnode-redux-server.herokuapp.com'
  : 'http://localhost:4444';

const client = new ApolloClient({ uri: `${HOST}/graphql` });

const store = configureStore();

const muiTheme = createMuiTheme({
  palette: {
    primary: deepOrange,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('app'),
);
