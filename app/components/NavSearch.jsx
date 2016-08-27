import React, {Component} from 'react';

class NavSearch extends Component {
  render () {
    return (
      <div className="nav-search">
        <i className="icon ion-search" />
        <input
          ref="query"
          className="nav-search-input"
          placeholder="SEARCH"
          type="text"
        />
      </div>
    );
  }
}

export default NavSearch;
