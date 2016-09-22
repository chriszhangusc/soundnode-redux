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
      <button
        className={`toggle-play-button ${(isActive ? 'active' : '')}`}
        onClick={handlePauseSong}
      >
        <i className="toggle-play-button-icon ion-ios-pause" />
      </button>
    );
  } else {
    togglePlayButton = (
      <button
        className={`toggle-play-button ${(isActive ? 'active' : '')}`}
        onClick={() => {
          if (isActive) handlePlaySong();
          else handleChangeSong();
        }}
      >
        <i className="toggle-play-button-icon ion-ios-play" />
      </button>
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
