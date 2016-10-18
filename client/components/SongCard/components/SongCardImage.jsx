import React, { PropTypes } from 'react';
import MagicButton from 'client/components/MagicButton';
import defaultArtworkImage from 'assets/images/default-artwork.png';

export default function SongCardImage(props) {
  const {
    isActive,
    artworkUrl,
    isPlaying,
    handlePauseSong,
    handlePlaySong,
    handleChangeSong
  } = props;


  return (
    <div
      className="song-card-image"
      style={{ backgroundImage: `url(${artworkUrl || defaultArtworkImage})` }}
    >
      { isActive && isPlaying ?
        <MagicButton
          btnClassName={`toggle-play-button ${(isActive ? 'active' : '')}`}
          iconClassName="toggle-play-button-icon ion-ios-pause"
          onClick={handlePauseSong}
        /> :
        <MagicButton
          btnClassName={`toggle-play-button ${(isActive ? 'active' : '')}`}
          iconClassName="toggle-play-button-icon ion-ios-play"
          onClick={isActive ? handlePlaySong : handleChangeSong}
        />
      }
    </div>
  );
}

SongCardImage.propTypes = {
  isActive: PropTypes.bool,
  artworkUrl: PropTypes.string,
  isPlaying: PropTypes.bool,
  handlePlaySong: PropTypes.func,
  handlePauseSong: PropTypes.func,
  handleChangeSong: PropTypes.func
};
