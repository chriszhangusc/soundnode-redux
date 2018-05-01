import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'app/store/configureStore';
import App from 'app/layout/App';
import 'isomorphic-fetch';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'app/css/theme';
import 'font-awesome/css/font-awesome.min.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: 'http://localhost:4444/graphql' });

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('app'),
);
