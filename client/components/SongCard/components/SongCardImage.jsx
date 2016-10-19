import React, { PropTypes } from 'react';
import MagicButton from 'client/components/MagicButton';
import defaultArtworkImage from 'assets/images/default-artwork.png';

export default function SongCardImage(props) {
// console.log('Render: SongCardImage');
  const {
    active,
    artworkUrl,
    playing,
    handleImageClick
  } = props;

  return (
    <div
      className="song-card-image"
      style={{ backgroundImage: `url(${artworkUrl || defaultArtworkImage})` }}
    >

      <MagicButton
        btnClassName={`toggle-play-button ${(active ? 'active' : '')}`}
        iconClassName={`toggle-play-button-icon ${playing ? 'ion-ios-pause' : 'ion-ios-play'}`}
        onClick={handleImageClick}
      />
    </div>
  );
}

SongCardImage.propTypes = {
  active: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  artworkUrl: PropTypes.string, // Could be null
  handleImageClick: PropTypes.func.isRequired
  // handlePlaySong: PropTypes.func.isRequired,
  // handlePauseSong: PropTypes.func.isRequired,
  // handleChangeSong: PropTypes.func.isRequired
};

// { active && playing ?
//   <MagicButton
//     btnClassName={`toggle-play-button ${(active ? 'active' : '')}`}
//     iconClassName="toggle-play-button-icon ion-ios-pause"
//     onClick={handlePauseSong}
//   /> :
//   <MagicButton
//     btnClassName={`toggle-play-button ${(active ? 'active' : '')}`}
//     iconClassName="toggle-play-button-icon ion-ios-play"
//     onClick={active ? handlePlaySong : handleChangeSong}
//   />
// }
