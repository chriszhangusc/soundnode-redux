import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defaultEventHandlerFactory } from 'client/common/utils/FactoryUtils';
import styled from 'styled-components';
import NavSearchDropdownTrackContainer from '../containers/NavSearchDropdownTrackContainer';
import NavSearchDropdownArtistContainer from '../containers/NavSearchDropdownArtistContainer';


const StyledSearchBox = styled.input`
  border-bottom: 1px solid $light-gray;
`;

class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.onShowAllClick = this.onShowAllClick.bind(this);
  }

  // When user press enter, show all results.
  onSubmit(e) {
    e.preventDefault();
    const { handleShowAll } = this.props;
    const searchKeyword = this.searchInput.value;
    handleShowAll(searchKeyword);
    this.searchInput.value = '';
  }

  onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const { handleChange } = this.props;
    handleChange(e.target.value.trim());
  }

  onFocus(e) {
    this.props.handleFocus(e.target.value.trim());
  }

  onBlur() {
    this.props.handleBlur();
  }

  onShowAllClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { handleShowAll } = this.props;
    handleShowAll(this.searchInput.value.trim());
  }


  renderSearchResults() {
    const { userIds, trackIds, dropdownShown } = this.props;
    const dropdownSearchShowCount = 3;

    return (
      <div className={`nav-search-result ${dropdownShown && 'show'}`}>
        {userIds.length !== 0 &&
          <div className="dropdown-title">
            ARTISTS
          </div>}
        <ul className="dropdown-list">
          {userIds
            .slice(0, dropdownSearchShowCount)
            .map(userId => (
              <NavSearchDropdownArtistContainer key={userId} userId={userId} />
            ))}
        </ul>
        {trackIds.length !== 0 &&
          <div className="dropdown-title">
            TRACKS
          </div>}

        <ul className="dropdown-list">
          {trackIds
            .slice(0, dropdownSearchShowCount)
            .map(trackId => <NavSearchDropdownTrackContainer key={trackId} trackId={trackId} />)}
          {trackIds.length !== 0 &&
            <li className="dropdown-item-show-all">
              <Link to="" className="dropdown-show-all-link" onMouseDown={this.onShowAllClick}>
                SHOW ALL
              </Link>
            </li>}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="nav-search">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <i className="icon ion-search" />
            <input
              type="search"
              className="nav-search-input"
              placeholder="Search SoundCloud"
              ref={(node) => { this.searchInput = node; }}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>
        </form>
        {this.renderSearchResults()}
      </div>
    );
  }
}

NavSearch.propTypes = {
  dropdownShown: PropTypes.bool.isRequired,
  userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  trackIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
};

export default NavSearch;
