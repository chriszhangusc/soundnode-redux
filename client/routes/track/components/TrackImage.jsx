import React, { PropTypes } from 'react';
import Track from 'client/models/Track';
import MagicButton from 'client/components/MagicButton';
import defaultArtworkImage from 'assets/images/default-artwork.png';
import { formatPlaybacks, formatLikes, formatImageUrl } from 'client/utils/FormatUtils';
import { t500x500 } from 'client/constants/ImageConstants';

const TrackImage = ({
  track,
  isLiked,
  isActive,
  isPlaying,
  handlePlaySong,
  handlePauseSong,
  handleChangeSong,
  handleUnlikeClick,
  handleLikeClick
}) => (
  <div className="track-avatar">
    <div
      className="song-card-image track-image"
      style={{
        backgroundImage: `url(${formatImageUrl(track.getArtworkUrl(), t500x500)
          || defaultArtworkImage})`
      }}
    >
      { // This logic could be simpler
        isActive && isPlaying ?
          <MagicButton
            btnClassName="toggle-play-button"
            iconClassName="toggle-play-button-icon ion-ios-pause icon-big"
            onClick={handlePauseSong}
          /> :
            <MagicButton
              btnClassName="toggle-play-button"
              iconClassName="toggle-play-button-icon ion-ios-play icon-big"
              onClick={() => {
                if (isActive) handlePlaySong();
                else handleChangeSong(track);
              }}
            />
      }
    </div>
    <div className="image-details-bar">
      <span className="playback-count">
        <i className="fa fa-play" /> {formatPlaybacks(track.getPlaybackCount())}
      </span>
      <span className="likes-count">
        <MagicButton
          btnClassName="icon-button"
          iconClassName={`fa fa-heart ${isLiked && 'active'}`}
          onClick={isLiked ? handleUnlikeClick : handleLikeClick}
        />
        {formatLikes(track.getLikedCount())}
      </span>
    </div>
  </div>
);

TrackImage.propTypes = {
  track: PropTypes.instanceOf(Track).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  handlePlaySong: PropTypes.func.isRequired,
  handlePauseSong: PropTypes.func.isRequired,
  handleChangeSong: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleUnlikeClick: PropTypes.func.isRequired
};

export default TrackImage;
