import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import ReactDOM from 'react-dom';
import configureStore from 'app/store/configureStore';
import App from 'app/layout/App';
import 'isomorphic-fetch';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
  <IntlProvider locale="en">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('app'),
);
