import React from 'react';
import * as Redux from 'react-redux';
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export const TodoApp = React.createClass({
  onLogout(e) {
    e.preventDefault();
    var {dispatch} = this.props;

    // Why?
    dispatch(actions.startLogout());
  },
  render() {
    return (
      <div>
        <div className="page-actions">
          <a onClick={this.onLogout}>Logout</a>
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

export default Redux.connect()(TodoApp);
