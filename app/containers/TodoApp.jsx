const React = require('react');

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

const uuid = require('node-uuid');
const moment = require('moment');


const TodoApp = React.createClass({

  render: function () {
    return (
      <div>
        <div className="page-actions">
          <a href="#">Logout</a>
        </div>
        <h1 className="page-title">Todo App</h1>
        <div className="row small-10 medium-6 large-4 small-centered columns">
          <div className="container">
            <TodoSearch/>
            <TodoList/>
            <AddTodo/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
