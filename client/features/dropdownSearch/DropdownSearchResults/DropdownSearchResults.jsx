import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  isDropdownShown,
  getDropdownSearchuserIds,
  getDropdownSearchTrackIds,
} from 'client/features/dropdownSearch/dropdownSearchSelectors';

import DropdownSearchResultsRowUser from './DropdownSearchResultsRowUser';
import DropdownSearchResultsRowTrack from './DropdownSearchResultsRowTrack';
import DropdownSearchResultsTitle from './DropdownSearchResultsTitle';

const dropdownSearchShowCount = 3;

// Render the artists/users results section.
function ArtistResults(userIds) {
  return (
    <ul>
      <DropdownSearchResultsTitle>ARTISTS</DropdownSearchResultsTitle>
      {userIds
        .slice(0, dropdownSearchShowCount)
        .map(userId => <DropdownSearchResultsRowUser key={userId} userId={userId} />)}
    </ul>
  );
}

// Render the tracks results section.
function TrackResults(trackIds) {
  return (
    <ul>
      <DropdownSearchResultsTitle>TRACKS</DropdownSearchResultsTitle>
      {trackIds
        .slice(0, dropdownSearchShowCount)
        .map(trackId => <DropdownSearchResultsRowTrack key={trackId} trackId={trackId} />)}
      {
        <li className="dropdown-item-show-all">
          <Link to="" className="dropdown-show-all-link" onMouseDown={() => {}}>
            SHOW ALL TRACKS
          </Link>
        </li>
      }
    </ul>
  );
}

function DropdownSearchResults({ userIds, trackIds, dropdownShown }) {
  return (
    <div className={`nav-search-result ${dropdownShown && 'show'}`}>
      {userIds.length !== 0 && ArtistResults(userIds)}
      {trackIds.length !== 0 && TrackResults(trackIds)}
    </div>
  );
}

DropdownSearchResults.propTypes = {
  userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  trackIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  dropdownShown: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    dropdownShown: isDropdownShown(state),
    userIds: getDropdownSearchuserIds(state),
    trackIds: getDropdownSearchTrackIds(state),
  };
}

export default connect(mapStateToProps)(DropdownSearchResults);
