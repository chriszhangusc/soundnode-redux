import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router, Route, IndexRoute, hashHistory } from 'react-router';
import {configure} from './store/configureStore';
import { Provider } from 'react-redux';
import configureRoutes from './router/index';
// Import stylesheets(inline)
import '../styles/app.scss';

const store = configure();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
<Provider store={store}>
  {configureRoutes(store)}
</Provider>
  , document.querySelector('#app')
);
