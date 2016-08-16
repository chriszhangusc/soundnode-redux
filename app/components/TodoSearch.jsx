const React = require('react');
const { connect } = require('react-redux');
const actions = require('actions');

export const TodoSearch = React.createClass({

  render: function () {
    const { showCompleted, searchText, dispatch } = this.props;

    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Search todos" value={searchText} onChange={() => {
                const searchText = this.refs.searchText.value;
                dispatch(actions.setSearchText(searchText));
            }} />
        </div>
        <label>
          <input type="checkbox" ref="showCompleted" onChange={() => {
              dispatch(actions.toggleShowComplated())
            }} checked={showCompleted} />
          Show completed todos
        </label>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    showCompleted: state.showCompleted,
    searchText: state.searchText,
  };
};

export default connect(mapStateToProps)(TodoSearch);
