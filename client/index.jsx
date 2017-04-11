import SC from 'soundcloud';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'client/redux/configureStore';
import 'isomorphic-fetch';
import 'rxjs';
import 'react-notifications/src/notifications.scss';
import App from 'client/components/App';
import './styles/app.scss';
import { CLIENT_ID, REDIRECT_URI } from './constants/AuthConsts';

// This is essential for SoundCloud authentication.
SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
