import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'client/redux/configureStore';
import configureRoutes from './router';
import 'isomorphic-fetch';

import 'react-notifications/src/notifications.scss';
import './styles/app.scss';

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
    <Provider store={store}>
        {configureRoutes(store)}
    </Provider>,
    document.getElementById('app')
);
