const React = require('react');
const TodoItem = React.createClass({
  propTypes: {
    todo: React.PropTypes.object.isRequired
  },
  render: function () {
    const {id, text} = this.props.todo;
    return (
      <div>
        {id}. {text}
      </div>
    );
  }
});

module.exports = TodoItem;
