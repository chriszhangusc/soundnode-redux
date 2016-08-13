const React = require('react');

const TodoSearch = React.createClass({
  onChange: function () {
    const showCompleted = this.refs.showCompleted.checked;
    const searchText = this.refs.searchText.value;
    this.props.handleSearch(showCompleted, searchText);
  },
  render: function () {
    return (
      <div>
        <div>
          <input type="search" ref="searchText" placeholder="Search todos" onChange={this.onChange} />
        </div>
        <label>
          <input type="checkbox" ref="showCompleted" onChange={this.onChange}/>
          Show completed todos
        </label>
      </div>


    );
  }
});

module.exports = TodoSearch;
