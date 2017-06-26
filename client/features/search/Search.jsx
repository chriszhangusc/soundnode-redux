import React from 'react';
import { connect } from 'react-redux';
import * as searchActions from 'features/search/searchActions';
import PropTypes from 'prop-types';
import SongCardList from 'common/components/SongCardList';
import { isSearching, getTrackResults } from 'features/search/searchSelectors';

class Search extends React.Component {
  componentWillMount() {
    // Load query params from url
    const { loadSearchResults, match } = this.props;
    const { query } = match.params;
    loadSearchResults(query);
  }

  render() {
    const { query } = this.props.match.params;

    return (
      <SongCardList
        title={`Search results for ${query.toUpperCase()}`}
        scrollFunc={this.props.loadMoreSearchResults}
        {...this.props}
      />
    );
  }
}

Search.propTypes = {
  loadSearchResults: PropTypes.func.isRequired,
  loadMoreSearchResults: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    fetching: isSearching(state),
    trackIds: getTrackResults(state),
  };
}

export default connect(mapStateToProps, searchActions)(Search);
