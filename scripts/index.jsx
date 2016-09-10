import React from 'react';
import ReactDOM from 'react-dom';
import configureStore  from './store/configureStore';
import Root from './components/Root';
// Import stylesheets(inline)
import '../styles/app.scss';

const store = configureStore();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);
