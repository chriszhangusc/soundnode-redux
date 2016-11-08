import React, { PropTypes } from 'react';
import MagicButton from 'client/components/MagicButton';
import { defaultArtworkImageUrl } from 'client/constants/ImageConstants';

export default function SongCardImage({
  active,
  artworkUrl,
  playing,
  handleImageClick,
}) {
// console.log('Render: SongCardImage');

  return (
    <div
      className="song-card-image"
      style={{ backgroundImage: `url(${artworkUrl || defaultArtworkImageUrl})` }}
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
  active: PropTypes.bool,
  playing: PropTypes.bool,
  artworkUrl: PropTypes.string,
  handleImageClick: PropTypes.func,
};
