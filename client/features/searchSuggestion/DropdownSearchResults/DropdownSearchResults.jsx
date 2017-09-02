import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'features/searchSuggestion/searchSuggestionSelectors';
import DropdownSearchResultsRowUser from './DropdownSearchResultsRowUser';
import DropdownSearchResultsRowTrack from './DropdownSearchResultsRowTrack';
import ShowAllLink from './ShowAllLink';
import Wrapper from './Wrapper';

// Render the artists/users results section.
function renderArtistResults(userIds) {
  return userIds.map(userId =>
    <DropdownSearchResultsRowUser key={userId.toString()} userId={userId} />,
  );
}

// Render the tracks results section.
function renderTrackResults(trackIds) {
  return trackIds.map(trackId =>
    <DropdownSearchResultsRowTrack key={trackId.toString()} trackId={trackId} />,
  );
}

function DropdownSearchResults({ userIds, trackIds, hidden, queryLink }) {
  return (
    <Wrapper hidden={hidden}>
      {renderArtistResults(userIds)}
      {renderTrackResults(trackIds)}
      <ShowAllLink to={queryLink}>SHOW ALL TRACKS</ShowAllLink>
    </Wrapper>
  );
}

DropdownSearchResults.defaultProps = {
  queryLink: '',
};

DropdownSearchResults.propTypes = {
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

export default connect(mapStateToProps)(DropdownSearchResults);
