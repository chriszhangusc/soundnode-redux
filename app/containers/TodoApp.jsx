const React = require('react');
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');
const TodoApp = React.createClass({
  getInitialState: function () {
    return {
      showCompleted: true,
      searchText: '',
      todos: [{
        id: 1,
        text: 'Walk the dog'
      }, {
        id: 2,
        text: 'Clean the yard'
      }, {
        id: 3,
        text: 'Learn to ride the bike'
      }, {
        id: 4,
        text: 'Running'
      }]
    };
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleAddTodo: function (text) {
    alert('new todo:' + text);
  },

  render: function () {
    const { todos } = this.state;
    return (
      <div>
        <div className="row small-10 medium-6 large-4 small-centered columns">
          <TodoSearch onSearch={this.handleSearch} />
          <TodoList todos={todos}/>
          <AddTodo handleAddTodo={this.handleAddTodo} />
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
