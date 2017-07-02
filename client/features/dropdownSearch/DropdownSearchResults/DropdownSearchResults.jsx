import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SEARCH_ROUTE } from 'common/constants/routeConsts';
import {
  isDropdownSearchResultsHidden,
  getDropdownSearchUserIds,
  getDropdownSearchTrackIds,
  getDropdownSearchQuery,
} from 'features/dropdownSearch/dropdownSearchSelectors';

import { BACKGROUND_COLOR_SECONDARY } from 'app/css/colors';

import styled from 'styled-components';

import DropdownSearchResultsRowUser from './DropdownSearchResultsRowUser';
import DropdownSearchResultsRowTrack from './DropdownSearchResultsRowTrack';
import DropdownSearchResultsRowTitle from './DropdownSearchResultsRowTitle';
import DropdownSearchResultsRowLink from './DropdownSearchResultsRowLink';

const dropdownSearchShowCount = 3;

// Render the artists/users results section.
function renderArtistResults(userIds) {
  return (
    <ul>
      <DropdownSearchResultsRowTitle>ARTISTS</DropdownSearchResultsRowTitle>
      {userIds
        .slice(0, dropdownSearchShowCount)
        .map(userId => <DropdownSearchResultsRowUser key={userId.toString()} userId={userId} />)}
    </ul>
  );
}

// Render the tracks results section.
function renderTrackResults(trackIds, query) {
  return (
    <ul>
      <DropdownSearchResultsRowTitle>TRACKS</DropdownSearchResultsRowTitle>
      {trackIds
        .slice(0, dropdownSearchShowCount)
        .map(trackId => (
          <DropdownSearchResultsRowTrack key={trackId.toString()} trackId={trackId} />
        ))}
      {
        <li>
          <DropdownSearchResultsRowLink to={`${SEARCH_ROUTE}/${query}`}>SHOW ALL TRACKS</DropdownSearchResultsRowLink>
        </li>
      }
    </ul>
  );
}

const Wrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 50px;
    background-color: ${BACKGROUND_COLOR_SECONDARY};
    z-index: 1002;
    display: block;
    transition: .4s ease-in-out;
    box-shadow: ${props => !props.hidden && '0 0 10px 8px rgba(0, 0, 0, 0.2)'};
    padding: ${props => !props.hidden && '10px 10px 5px 10px'};
    transform: ${props => !props.hidden && 'translateY(0)'};
    max-height: ${props => !props.hidden && '600px'};
`;

function DropdownSearchResults({ userIds, trackIds, hidden, query }) {
  return (
    <Wrapper hidden={hidden}>
      {userIds.length !== 0 && renderArtistResults(userIds)}
      {trackIds.length !== 0 && renderTrackResults(trackIds, query)}
    </Wrapper>
  );
}

DropdownSearchResults.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  trackIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  hidden: PropTypes.bool.isRequired,
  query: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    hidden: isDropdownSearchResultsHidden(state),
    userIds: getDropdownSearchUserIds(state),
    trackIds: getDropdownSearchTrackIds(state),
    query: getDropdownSearchQuery(state),
  };
}

export default connect(mapStateToProps)(DropdownSearchResults);
