import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BACKGROUND_COLOR, BOX_SHADOW_COLOR, THEME_COLOR } from 'client/app/css/colors';

import { connect } from 'react-redux';
import { getTrackById } from 'client/features/entities/entitiesSelectors';
import { isTrackActive } from 'client/features/player/playerSelectors';

import SongCardDetails from './SongCardDetails';
import SongCardControls from './SongCardControls';
import SongCardImage from './SongCardImage';

const mapStateToProps = (state, { trackId }) => ({
  track: getTrackById(state, trackId),
  active: isTrackActive(state, trackId),
});

const SongCardWrapper = styled.div`
  background-color: ${BACKGROUND_COLOR};
  box-shadow: 0 0 12px 8px ${BOX_SHADOW_COLOR};
  padding: 11px;
  width: 230px;
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => (props.active ? THEME_COLOR : 'transparent')};
`;

// playlistName: The name of playlist this track belongs
function SongCard({ track, active }) {
  if (!track) throw new Error('Track object should not be null');
  return (
    <SongCardWrapper active={active}>
      <SongCardImage track={track} />
      <SongCardDetails track={track} />
      <SongCardControls track={track} />
    </SongCardWrapper>
  );
}

SongCard.defaultProps = {
  track: null,
  active: false,
};

SongCard.propTypes = {
  track: PropTypes.object,
  active: PropTypes.bool.isRequired,
  // playlistName: PropTypes.string,
};

export default connect(mapStateToProps)(SongCard);

