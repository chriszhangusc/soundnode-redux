import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrackById } from 'features/entities/entitiesSelectors';
import { isTrackActive } from 'features/player/playerSelectors';
import Card from 'common/components/Card';
import SongCardDetails from './SongCardDetails';
import SongCardControls from './SongCardControls';
import SongCardImage from './SongCardImage';

// playlistName: The name of playlist this track belongs
function SongCard({ track, active }) {
  if (track && track.streamable) {
    return (
      <Card active={active}>
        <SongCardImage track={track} />
        <SongCardDetails track={track} />
        <SongCardControls track={track} />
      </Card>
    );
  }
  return null;
}

SongCard.defaultProps = {
  track: undefined,
  active: false,
};

SongCard.propTypes = {
  track: PropTypes.object,
  active: PropTypes.bool.isRequired,
};

function mapStateToProps(state, { trackId }) {
  return {
    track: getTrackById(state, trackId),
    active: isTrackActive(state, trackId),
  };
}

export default connect(mapStateToProps)(SongCard);
