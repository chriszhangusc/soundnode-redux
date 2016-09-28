import React, { Component, PropTypes } from 'react';
import { KEY_ENTER } from '../constants/KeyCodes';
import NavUserContainer from '../containers/NavUserContainer';

class NavSearch extends Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.charCode === KEY_ENTER) {
      const searchText = this.searchField.value.trim().toLowerCase();
      if (searchText) this.props.handleSearch(searchText);
    }
  }

  render() {
    return (
      <div className="nav table-display pull-right">
        <div className="table-item nav-search">
          <form>
            <div className="form-group">
              <i className="icon ion-search" />
              <input
                ref={(ref) => { this.searchField = ref; }}
                className="nav-search-input"
                placeholder="SEARCH"
                type="text"
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </form>
        </div>
        <div className="table-item">
          <NavUserContainer />
        </div>
      </div>
    );
  }
}

NavSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

export default NavSearch;
