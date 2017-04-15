import React from 'react';
import PropTypes from 'prop-types';
import SongCardInfoContainer from '../containers/SongCardInfoContainer';
import SongCardControlsContainer from '../containers/SongCardControlsContainer';
import SongCardImageContainer from '../containers/SongCardImageContainer';
import styles from './SongCard.css';

function SongCardLayout({ track, active, trackIds, playlistName }) {
  if (!track) return null;
  return (
    <div className={active ? styles.songCardActive : styles.songCard}>
      <SongCardImageContainer track={track} trackIds={trackIds} playlistName={playlistName} />
      <SongCardInfoContainer track={track} />
      <SongCardControlsContainer track={track} />
    </div>
  );
}

SongCardLayout.defaultProps = {
  track: null,
  active: false,
  trackIds: [],
  playlistName: '',
};

SongCardLayout.propTypes = {
  track: PropTypes.object,
  active: PropTypes.bool,
  trackIds: PropTypes.array,
  playlistName: PropTypes.string,
};

export default SongCardLayout;
