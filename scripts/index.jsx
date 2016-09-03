import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//ES6 destructuring
import {Router, Route, IndexRoute, hashHistory } from 'react-router';

import {configure} from './store/configureStore';

import { Provider } from 'react-redux';
import configureRoutes from './router/index';
require('applicationStyles');

const store = configure();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
<Provider store={store}>
  {configureRoutes(store)}
</Provider>
  , document.querySelector('#app')
);
