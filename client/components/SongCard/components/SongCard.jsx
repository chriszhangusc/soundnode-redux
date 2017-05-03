import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BACKGROUND_COLOR, BOX_SHADOW_COLOR, THEME_COLOR } from 'client/css/colors';
import SongCardInfoContainer from '../containers/SongCardInfoContainer';
import SongCardControlsContainer from '../containers/SongCardControlsContainer';
import SongCardImageContainer from '../containers/SongCardImageContainer';

const SongCardWrapper = styled.div`
  background-color: ${BACKGROUND_COLOR};
  box-shadow: 0 0 12px 8px ${BOX_SHADOW_COLOR};
  padding: 11px;
  width: 250px;
  margin: 10px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => props.active ? THEME_COLOR : 'transparent'};
`;

// playlistName: The name of playlist this track belongs
function SongCard({ track, active }) {
  if (!track) throw new Error('Track object should not be null');
  return (
    <SongCardWrapper active={active}>
      <SongCardImageContainer track={track} />
      <SongCardInfoContainer track={track} />
      <SongCardControlsContainer track={track} />
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

export default SongCard;
