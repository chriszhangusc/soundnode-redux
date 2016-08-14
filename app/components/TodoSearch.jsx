const React = require('react');

const TodoSearch = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func.isRequired,
    showCompleted: React.PropTypes.bool.isRequired,
  },
  onChange: function () {
    const showCompleted = this.refs.showCompleted.checked;
    const searchText = this.refs.searchText.value;
    this.props.onSearch(showCompleted, searchText);
  },
  render: function () {
    const { showCompleted } = this.props;
    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Search todos" onChange={this.onChange} />
        </div>
        <label>
          <input type="checkbox" ref="showCompleted" onChange={this.onChange} checked={showCompleted} />
          Show completed todos
        </label>
      </div>
    );
  }
});

module.exports = TodoSearch;
