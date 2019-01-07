import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from '@soundnode-redux/client/src/features/searchSuggestion/searchSuggestionSelectors';
import SearchSuggestionResultsRowUser from './SearchSuggestionResultsRowUser';
import SearchSuggestionResultsRowTrack from './SearchSuggestionResultsRowTrack';
import ShowAll from './ShowAllLink';
import Wrapper from './Wrapper';

// Render the artists/users results section.
function renderArtistResults(userIds) {
  return userIds.map(userId => (
    <SearchSuggestionResultsRowUser key={userId.toString()} userId={userId} />
  ));
}

// Render the tracks results section.
function renderTrackResults(trackIds) {
  return trackIds.map(trackId => (
    <SearchSuggestionResultsRowTrack key={trackId.toString()} trackId={trackId} />
  ));
}

function renderShowAll(trackIds, queryLink) {
  return trackIds.length > 0 && <ShowAll to={queryLink}>SHOW ALL TRACKS</ShowAll>;
}

function SearchSuggestionResults({ userIds, trackIds, hidden, queryLink }) {
  return (
    <Wrapper searchResultsHidden={hidden}>
      {renderArtistResults(userIds)}
      {renderTrackResults(trackIds)}
      {renderShowAll(trackIds, queryLink)}
    </Wrapper>
  );
}

SearchSuggestionResults.defaultProps = {
  queryLink: '',
};

SearchSuggestionResults.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  trackIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  hidden: PropTypes.bool.isRequired,
  queryLink: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    hidden: selectors.isSearchSuggestionResultsHidden(state),
    userIds: selectors.getSearchSuggestionUserIds(state),
    trackIds: selectors.getSearchSuggestionTrackIds(state),
    queryLink: selectors.getSearchSuggestionQueryLink(state),
  };
}

export default connect(mapStateToProps)(SearchSuggestionResults);
