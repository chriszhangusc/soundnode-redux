import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'features/dropdownSearch/dropdownSearchSelectors';
import { zIndexDropdownSearch } from 'app/css/zIndex';
import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';
import DropdownSearchResultsRowUser from './DropdownSearchResultsRowUser';
import DropdownSearchResultsRowTrack from './DropdownSearchResultsRowTrack';

const ShowAllLink = RouterLink.extend`
  display: block;
  line-height: 35px;
  text-align: center;
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.9rem;
  padding: 5px;
`;

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50px;
  background-color: ${props => props.theme.colors.bgColorSub};
  z-index: ${zIndexDropdownSearch};
  display: block;
  transition: all 0.4s ease-in-out;
  box-shadow: ${props => !props.hidden && '0 0 10px 8px rgba(0, 0, 0, 0.2)'};
  padding: ${props => !props.hidden && '10px 10px 5px 10px'};
  transform: ${props => !props.hidden && 'translateY(0)'};
  max-height: ${props => !props.hidden && '600px'};
`;

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
    hidden: selectors.isDropdownSearchResultsHidden(state),
    userIds: selectors.getDropdownSearchUserIds(state),
    trackIds: selectors.getDropdownSearchTrackIds(state),
    queryLink: selectors.getDropdownSearchQueryLink(state),
  };
}

export default connect(mapStateToProps)(DropdownSearchResults);
