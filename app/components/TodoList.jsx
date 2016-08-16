const React = require('react');
// const TodoItem = require('TodoItem');
import TodoItem from 'TodoItem';
const { connect } = require('react-redux');
const TodoAPI = require('TodoAPI');

export const TodoList = React.createClass({

  render: function () {
    const { todos, showCompleted, searchText } = this.props;
    const renderTodos = () => {
      if (todos.length === 0) {
        return <p className="container__message">Nothing to do</p>;
      }

      return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
        return (
          <TodoItem key={todo.id} {...todo} />
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

const mapStateToProps = (state) => {
  return state;
}

// Specify what data TodoList is going to need.
export default connect(
  mapStateToProps
)(TodoList);
