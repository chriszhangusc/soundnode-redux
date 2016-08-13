const React = require('react');
const TodoItem = require('TodoItem');
const TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired
  },
  render: function () {
    const {todos} = this.props;

    const renderTodos = () => {
      return todos.map((todo) => {
        return (
          <TodoItem key={todo.id} todo={todo}/>
        );
      });
    };

    return (
      <div>
          { renderTodos() }
      </div>
    );
  }
});

module.exports = TodoList;
