import React, { Component, PropTypes } from 'react';
import throttle from 'lodash/throttle';
import NavUserContainer from '../containers/NavUserContainer';
import Spinner from './Spinner';

class NavSearch extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.renderDropdownList = this.renderDropdownList.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const { handleSearch } = this.props;
    const keywords = e.target.value.trim();
    handleSearch(keywords);
  }

  onFocus(e) {
    const keyword = e.target.value.trim();
    if (keyword !== '') {
      this.props.handleSearch(keyword);
    }
  }

  onBlur() {
    this.props.handleBlur();
  }



  renderDropdownList() {
    const { users, tracks, isFetching, showResults } = this.props;
    if (showResults) {
      return (
        <div className="nav-search-result">
          <div className="nav-search-result-title">
            ARTISTS
          </div>
          <ul className="nav-search-result-list">
            {
              users.map(user =>
                (<li className="nav-search-result-item" key={user.id}>
                  <img
                    alt="user-profile-img"
                    className="nav-search-result-item-image"
                    src={user.avatar_url}
                  />
                  <span className="nav-search-result-item-username">{user.username}</span>
                </li>)
              )
            }
          </ul>
          <div className="nav-search-result-title">
            TRACKS
          </div>
          <ul className="nav-search-result-list">
            {
              tracks.map(track =>
                (<li className="nav-search-result-item" key={track.id}>
                  <img
                    alt="user-profile-img"
                    className="nav-search-result-item-image"
                    src={track.artwork_url}
                  />
                  <span className="nav-search-result-item-username">{track.title}</span>
                </li>)
              )
            }
          </ul>
        </div>
      );
    }

    return <div />;
  }

  render() {
    return (
      <div className="nav table-display pull-right">
        <div className="table-item nav-search">
          <form>
            <div className="form-group">
              <i className="icon ion-search" />
              <input
                className="nav-search-input"
                placeholder="SEARCH"
                type="search"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            </div>
          </form>
          { this.renderDropdownList() }
        </div>

        <div className="table-item">
          <NavUserContainer />
        </div>
      </div>
    );
  }

}

NavSearch.propTypes = {
  showResults: PropTypes.bool,
  users: PropTypes.array,
  tracks: PropTypes.array,
  isFetching: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleSearch: PropTypes.func.isRequired
};

export default NavSearch;
