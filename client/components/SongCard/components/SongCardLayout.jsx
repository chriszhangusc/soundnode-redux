import React, { PropTypes } from 'react';
import Track from 'client/models/Track';
import SongCardInfoContainer from '../containers/SongCardInfoContainer';
import SongCardControlsContainer from '../containers/SongCardControlsContainer';
import SongCardImageContainer from '../containers/SongCardImageContainer';

const SongCardLayout = ({ track, active }) => {
  if (!track) return null;
  return (
    <div className={`card song-card ${(active ? 'active' : '')}`}>
      <SongCardImageContainer track={track} />
      <SongCardInfoContainer track={track} />
      <SongCardControlsContainer track={track} />
    </div>
  );
};

SongCardLayout.propTypes = {
  track: PropTypes.instanceOf(Track),
  active: PropTypes.bool
};

export default SongCardLayout;
