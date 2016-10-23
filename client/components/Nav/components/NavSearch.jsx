import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
// import Spinner from 'client/components/Spinner';
import NavSearchDropdownTrackContainer from '../containers/NavSearchDropdownTrackContainer';
import NavSearchDropdownArtistContainer from '../containers/NavSearchDropdownArtistContainer';

class NavSearch extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
  }

  // When user press enter, the search input form will be submitted
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

  renderSearchResults() {
    const { artistIds, trackIds, shouldShowResults } = this.props;
    if (shouldShowResults) {
      return (
        <div className="nav-search-result">
          <div className="nav-search-result-title">
            ARTISTS
          </div>
          <ul className="nav-search-result-list">
            {
              artistIds.map(artistId =>
                <NavSearchDropdownArtistContainer
                  key={artistId}
                  artistId={artistId}
                />)
            }
          </ul>
          <div className="nav-search-result-title">
            TRACKS
          </div>
          <ul className="nav-search-result-list">
            {
              trackIds.map(trackId =>
                <NavSearchDropdownTrackContainer
                  key={trackId}
                  trackId={trackId}
                />)
            }
          </ul>
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div className="table-item nav-search">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <i className="icon ion-search" />
            <input
              className="nav-search-input"
              placeholder="SEARCH"
              type="search"
              ref={(node) => { this.searchInput = node; }}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>
        </form>
        { this.renderSearchResults() }
      </div>
    );
  }

}


//
//
//


NavSearch.propTypes = {
  shouldShowResults: PropTypes.bool.isRequired,
  artistIds: PropTypes.instanceOf(List),
  trackIds: PropTypes.instanceOf(List),
  // isFetching: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func
};

export default NavSearch;
