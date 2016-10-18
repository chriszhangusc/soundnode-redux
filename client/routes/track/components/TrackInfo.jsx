import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MagicButton from 'client/components/MagicButton';
import Track from 'client/models/Track';

const TrackInfo = ({
  track,
  isLiked,
  handleUnlikeClick,
  handleLikeClick
}) => {
  const artist = track.getArtist(); // Should we pass it from the props?
  return (
    <div className="track-details">
      <h1 className="track-title">{ track.getTitle() }</h1>
      <div className="track-artist-name">
        Artist: <Link to={`/artist/${artist.getId()}`}>{ artist.getUsername() }</Link>
      </div>
      <div className="track-artist-name">
        Created At: {track.getCreatedAt().replace('+0000', '')}
      </div>
      <div className="track-description"><p>{track.getDescription()}</p></div>
      <div className="track-controls">
        <MagicButton
          btnClassName="button inline"
          iconClassName={`fa fa-heart ${isLiked && 'active'}`}
          onClick={isLiked ? handleUnlikeClick : handleLikeClick}
          text={isLiked ? 'UNLIKE' : 'LIKE'}
        />
        <MagicButton
          btnClassName="button inline"
          iconClassName="fa fa-bookmark"
          text="ADD TO PLAYLIST"
        />
        <MagicButton
          btnClassName="button inline"
          iconClassName="fa fa-external-link"
          text="PERMALINK"
        />
        <MagicButton
          btnClassName="button inline"
          iconClassName="fa fa-clipboard"
          text="COPY TRACK LINK"
        />
      </div>
    </div>

  );
};

TrackInfo.propTypes = {
  track: PropTypes.instanceOf(Track).isRequired,
  isLiked: PropTypes.bool.isRequired,
  handleUnlikeClick: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired
};

export default TrackInfo;
