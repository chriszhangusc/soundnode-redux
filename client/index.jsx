import SC from 'soundcloud';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'client/app/store/configureStore';
import App from 'client/app/layout/App';
import { CLIENT_ID, REDIRECT_URI } from 'client/common/constants/AuthConsts';
import 'isomorphic-fetch';
import 'rxjs';
import 'react-notifications/src/notifications.scss';
import 'normalize.css';
import 'client/app/styles/app.scss';

// This is essential for SoundCloud authentication.
SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
