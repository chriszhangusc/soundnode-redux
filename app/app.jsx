const React = require('react');
const ReactDOM = require('react-dom');

//ES6 destructuring
const {hashHistory } = require('react-router');
const actions = require('actions');
const store = require('configureStore').configure();
const { Provider } = require('react-redux');
import firebase from './firebase/index.js';
import router from './router/index.jsx';
// Equals to var Route = require('react-router').Route ....
// const TodoAPI = require('TodoAPI');

// import './../playground/firebase/index';

// Listen changes on our store
// store.subscribe(() => {
//   const state = store.getState();
//   console.log('New state', store.getState());
//   TodoAPI.setTodos(state.todos);
// });

// const initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Logged in
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    hashHistory.push('/todos');
  } else {
    // Logged out
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

// Fetch data from firebase
// store.dispatch(actions.startAddTodos());

// Load Foundation
// style loader, css loader
// require('style!css!sass!foundation-sites/dist/foundation.min.css');

$(document).foundation();

// App css
require('style!css!sass!applicationStyles');



// Use provider to provide our store down to the dom tree
// so that it can be shared among all components.
ReactDOM.render(
<Provider store={store}>
  {router}
</Provider>
  , document.querySelector('#app')
);
