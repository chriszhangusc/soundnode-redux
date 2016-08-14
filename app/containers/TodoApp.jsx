const React = require('react');
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');
const TodoAPI = require('TodoAPI');
const uuid = require('node-uuid');

const TodoApp = React.createClass({
  getInitialState: function () {
    return {
      showCompleted: true,
      searchText: '',
      todos: TodoAPI.getTodos()
    };
  },
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos);
  },
  handleToggle: function (id) {
    // Loop through all todos and check id
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos
    });
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleAddTodo: function (text) {
    this.setState({
      todos: [...this.state.todos, {
        id: uuid(),
        text: text,
        completed: false,
      }]
    });
  },

  render: function () {
    const { showCompleted, searchText, todos } = this.state;
    return (
      <div>
        <div className="row small-10 medium-6 large-4 small-centered columns">
          <TodoSearch onSearch={this.handleSearch} showCompleted={showCompleted}/>
          <TodoList todos={TodoAPI.filterTodos(todos, showCompleted, searchText)} onToggle={this.handleToggle}/>
          <AddTodo handleAddTodo={this.handleAddTodo} />
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
