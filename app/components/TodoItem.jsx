const React = require('react');
const moment = require('moment');
const { connect } = require('react-redux');
const actions = require('actions');

export const TodoItem = React.createClass({
  render: function () {
    const {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    let todoClassName = completed ? 'todo todo-completed' : 'todo';
    const renderDate = () => {
      let message = 'Created ';
      let timestamp = createdAt;
      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }
      return message + moment.unix(timestamp).format('MMM Do YYYY @ hh:mm a');
    };

    return (
      <div onClick={() => {
          dispatch(actions.toggleTodo(id));
        }} className={todoClassName}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
});

export default connect()(TodoItem);
