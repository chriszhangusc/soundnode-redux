import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'Main';
//ES6 destructuring
import {Router, Route, IndexRoute, hashHistory } from 'react-router';
const store = require('configureStore').configure();
import { Provider } from 'react-redux';

require('applicationStyles');


$(document).foundation();

// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    </Route>
  </Router>
</Provider>
  , document.querySelector('#app')
);
