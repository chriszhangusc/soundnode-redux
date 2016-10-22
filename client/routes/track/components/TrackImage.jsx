import React, { PropTypes } from 'react';
import MagicButton from 'client/components/MagicButton';
import defaultArtworkImage from 'assets/images/default-artwork.png';

const TrackImage = ({
  playbackCount,
  likeCount,
  liked,
  playing,
  artworkUrl,
  handleImageClick,
  handleToggleLike
}) => (
  <div className="track-avatar">
    <div
      className="song-card-image track-image"
      style={{
        backgroundImage: `url(${artworkUrl || defaultArtworkImage})`
      }}
    >
      <MagicButton
        btnClassName="toggle-play-button"
        iconClassName={`toggle-play-button-icon icon-big
          ${playing ? 'ion-ios-pause' : 'ion-ios-play'}`}
        onClick={handleImageClick}
      />
    </div>
    <div className="image-details-bar">
      <span className="playback-count">
        <i className="fa fa-play" /> {playbackCount}
      </span>
      <span className="likes-count">
        <MagicButton
          btnClassName="icon-button"
          iconClassName={`fa fa-heart ${liked && 'active'}`}
          onClick={handleToggleLike}
        />
        {likeCount}
      </span>
    </div>
  </div>
);

TrackImage.propTypes = {
  likeCount: PropTypes.string,
  playbackCount: PropTypes.string,
  liked: PropTypes.bool,
  playing: PropTypes.bool,
  artworkUrl: PropTypes.string,
  // active: PropTypes.bool.isRequired,
  handleToggleLike: PropTypes.func,
  handleImageClick: PropTypes.func
};

export default TrackImage;
