import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
const Main = require('Main');
import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'firebase';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    console.log('You are not allowed, login first!');
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    console.log('You are already logged in!');
    replace('/todos');
  }
  next();
};


export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      <Route path="/todos" component={TodoApp} onEnter={requireLogin}/>
    </Route>
  </Router>
);
