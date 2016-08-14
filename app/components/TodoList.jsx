const React = require('react');
const TodoItem = require('TodoItem');
const TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array.isRequired,
    onToggle: React.PropTypes.func.isRequired,
  },
  render: function () {
    const {todos, onToggle} = this.props;
    const renderTodos = () => {
      if (todos.length === 0) {
        return <p className="container__message">Nothing to do</p>;
      }
      return todos.map((todo) => {
        return (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle}/>
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
