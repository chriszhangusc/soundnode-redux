const React = require('react');
const ReactDOM = require('react-dom');
const Main = require('Main');
const TodoApp = require('TodoApp');
//ES6 destructuring
const { Route, Router, IndexRoute, hashHistory } = require('react-router');
const actions = require('actions');
const store = require('configureStore').configure();
const { Provider } = require('react-redux');
// Equals to var Route = require('react-router').Route ....
const TodoAPI = require('TodoAPI');
// Listen changes on our store
store.subscribe(() => {
  const state = store.getState();
  console.log('New state', store.getState());
  TodoAPI.setTodos(state.todos);
});

const initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));

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
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={TodoApp} />
      </Route>
    </Router>
  </Provider>

  , document.querySelector('#app')
);
