import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'client/redux/configureStore';
import 'isomorphic-fetch';
import 'rxjs';
import 'react-notifications/src/notifications.scss';
// import AppRoutes from 'client/router/v4';
// import configureRoutes from './router';
import App from 'client/components/App';

import './styles/app.scss';

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(<Provider store={store}>
  {/*{ configureRoutes(store) }*/}
  <App />
</Provider>, document.getElementById('app'));
