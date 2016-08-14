const React = require('react');
const TodoItem = React.createClass({
  propTypes: {
    todo: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func.isRequired,
  },
  render: function () {
    const {id, text, completed} = this.props.todo;
    return (
      <div onClick={() => {
          this.props.onToggle(id);
        }}>
        <input type="checkbox" checked={completed}/>
        {text}
      </div>
    );
  }
});

module.exports = TodoItem;
