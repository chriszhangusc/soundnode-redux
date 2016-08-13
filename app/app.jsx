const React = require('react');
const ReactDOM = require('react-dom');
const Main = require('Main');
const TodoApp = require('TodoApp');
//ES6 destructuring
const { Route, Router, IndexRoute, hashHistory } = require('react-router');
// Equals to var Route = require('react-router').Route ....

// Load Foundation
// style loader, css loader
// require('style!css!sass!foundation-sites/dist/foundation.min.css');

$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={TodoApp} />
    </Route>
  </Router>, document.querySelector('#app')
);
