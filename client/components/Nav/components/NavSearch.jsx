import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
// import Spinner from 'client/components/Spinner';
import Track from 'client/models/Track';
import Artist from 'client/models/Artist';

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
    const { artists, tracks, shouldShowResults } = this.props;
    if (shouldShowResults) {
      return (
        <div className="nav-search-result">
          <div className="nav-search-result-title">
            ARTISTS
          </div>
          <ul className="nav-search-result-list">
            {
              artists.map(artist =>
                (<li className="nav-search-result-item" key={artist.getId()}>
                  <img
                    alt="user-profile-img"
                    className="nav-search-result-item-image"
                    src={artist.getAvatarUrl()}
                  />
                  <Link
                    onMouseDown={(e) => {
                      // e.stopPropagation();
                      // e.preventDefault();
                      browserHistory.push(`/artist/${artist.getId()}`);
                    }}
                  >
                    <span className="nav-search-result-item-username">{artist.getUsername()}</span>
                  </Link>
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
                (<li className="nav-search-result-item" key={track.getId()}>
                  <img
                    alt="user-profile-img"
                    className="nav-search-result-item-image"
                    src={track.getArtworkUrl()}
                  />
                  <Link
                    onMouseDown={(e) => {
                      // e.stopPropagation();
                      // e.preventDefault();
                      browserHistory.push(`/track/${track.getId()}`);
                    }}
                  >
                    <span className="nav-search-result-item-username">{track.getTitle()}</span>
                  </Link>
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

NavSearch.propTypes = {
  shouldShowResults: PropTypes.bool.isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape(Artist)),
  tracks: PropTypes.arrayOf(PropTypes.shape(Track)),
  // isFetching: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func
};

export default NavSearch;
