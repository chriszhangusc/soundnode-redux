import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  isDropdownShown,
  getDropdownSearchuserIds,
  getDropdownSearchTrackIds,
} from 'client/features/dropdownSearch/dropdownSearchSelectors';

import DropdownSearchResultUser from './DropdownSearchResultUser';
import DropdownSearchResultTrack from './DropdownSearchResultTrack';

function DropdownSearchResults({ userIds, trackIds, dropdownShown }) {
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
          .map(userId => <DropdownSearchResultUser key={userId} userId={userId} />)}
      </ul>
      {trackIds.length !== 0 &&
        <div className="dropdown-title">
          TRACKS
        </div>}

      <ul className="dropdown-list">
        {trackIds
          .slice(0, dropdownSearchShowCount)
          .map(trackId => <DropdownSearchResultTrack key={trackId} trackId={trackId} />)}
        {trackIds.length !== 0 &&
          <li className="dropdown-item-show-all">
            <Link to="" className="dropdown-show-all-link" onMouseDown={() => {}}>
              SHOW ALL
            </Link>
          </li>}
      </ul>
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
