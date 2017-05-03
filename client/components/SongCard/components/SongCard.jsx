import React from 'react';
import PropTypes from 'prop-types';
import SongCardInfoContainer from '../containers/SongCardInfoContainer';
import SongCardControlsContainer from '../containers/SongCardControlsContainer';
import SongCardImageContainer from '../containers/SongCardImageContainer';

// playlistName: The name of playlist this track belongs
function SongCard({ track, active }) {
  if (!track) throw new Error('Track object should not be null');
  return (
    <div className={`card song-card ${active ? 'active' : ''}`}>
      <SongCardImageContainer track={track} />
      <SongCardInfoContainer track={track} />
      <SongCardControlsContainer track={track} />
    </div>
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
