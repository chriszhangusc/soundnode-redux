import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
const Main = require('Main');




export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      <Route path="/todos" component={TodoApp} onEnter={requireLogin}/>
    </Route>
  </Router>
);
