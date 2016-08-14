const React = require('react');
const moment = require('moment');
const TodoItem = React.createClass({
  propTypes: {
    todo: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func.isRequired,
  },
  render: function () {

    const {id, text, completed, createdAt, completedAt} = this.props.todo;
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
          this.props.onToggle(id);
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

module.exports = TodoItem;
