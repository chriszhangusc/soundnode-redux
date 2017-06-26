import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SEARCH_ROUTE } from 'common/constants/routeConsts';
import {
  isDropdownSearchResultsHidden,
  getDropdownSearchUserIds,
  getDropdownSearchTrackIds,
  getDropdownSearchQuery,
} from 'features/dropdownSearch/dropdownSearchSelectors';

import { FONT_COLOR_SECONDARY, BACKGROUND_COLOR_SECONDARY } from 'app/css/colors';

import styled from 'styled-components';
import { media } from 'app/css/styleUtils';

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

const ShowAllLink = styled(Link)`
  display: block;
  line-height: 35px;
  text-align: center;
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.9rem;
  padding: 10px 10px 0 10px;
`;

// Render the tracks results section.
function TrackResults(trackIds, query) {
  return (
    <ul>
      <DropdownSearchResultsTitle>TRACKS</DropdownSearchResultsTitle>
      {trackIds
        .slice(0, dropdownSearchShowCount)
        .map(trackId => <DropdownSearchResultsRowTrack key={trackId} trackId={trackId} />)}
      {
        <li>
          <ShowAllLink to={`${SEARCH_ROUTE}/${query}`} onMouseDown={() => {}}>
            SHOW ALL TRACKS
          </ShowAllLink>
        </li>
      }
    </ul>
  );
}

const DROPDOWN_SEARCH_INPUT_WIDTH = '320px';
const DROPDOWN_SEARCH_INPUT_WIDTH_MD = '400px';
const DROPDOWN_SEARCH_INPUT_WIDTH_LG = '470px';
const DROPDOWN_SEARCH_INPUT_WIDTH_4K = '550px';

const Wrapper = styled.div`
    width: ${DROPDOWN_SEARCH_INPUT_WIDTH};
    ${media.desktop`width: ${DROPDOWN_SEARCH_INPUT_WIDTH_MD}`}
    ${media.desktopLG`width: ${DROPDOWN_SEARCH_INPUT_WIDTH_LG}`}
    ${media.desktop4K`width: ${DROPDOWN_SEARCH_INPUT_WIDTH_4K}`}
    position: absolute;
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
      {userIds.length !== 0 && ArtistResults(userIds)}
      {trackIds.length !== 0 && TrackResults(trackIds, query)}
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
