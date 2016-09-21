import React, { PropTypes } from 'react';

export default function SongCardImage(props) {
  const {
    isActive,
    songImage,
    isPlaying,
    handlePauseSong,
    handlePlaySong,
    handleChangeSong
  } = props;

  let togglePlayButton = null;
  if (isActive && isPlaying) {
    togglePlayButton = (
      <div className={`toggle-play-button ${(isActive ? 'active' : '')}`}
        onClick={ handlePauseSong }>
        <i className="toggle-play-button-icon ion-ios-pause" />
      </div>
    );
  } else {
    togglePlayButton = (
      <div
        className={`toggle-play-button ${(isActive ? 'active' : '')}`}
        onClick={() => {
          if (isActive) handlePlaySong();
          else handleChangeSong();
        }}>
        <i className="toggle-play-button-icon ion-ios-play" />
      </div>
    );
  }

  return (
    <div className="song-card-image" style={{ backgroundImage: `url(${songImage})` }}>
      { togglePlayButton }
    </div>
  );
}
SongCardImage.propTypes = {
  isActive: PropTypes.bool,
  songImage: PropTypes.string,
  isPlaying: PropTypes.bool,
  handlePlaySong: PropTypes.func,
  handlePauseSong: PropTypes.func,
  handleChangeSong: PropTypes.func
};
