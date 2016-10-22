import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MagicButton from 'client/components/MagicButton';

const TrackInfo = ({
  trackDesc,
  trackTitle,
  trackCreatedAt,
  artistLinkUrl,
  artistName,
  liked,
  handleToggleLike
}) => (
  <div className="track-details">
    <h1 className="track-title">{ trackTitle }</h1>
    <div className="track-artist-name">
      Artist: <Link to={artistLinkUrl}>{ artistName }</Link>
    </div>
    <div className="track-artist-name">
      Created At: {trackCreatedAt}
    </div>
    <div className="track-description"><p>{trackDesc}</p></div>
    <div className="track-controls">
      <MagicButton
        btnClassName="button inline"
        iconClassName={`fa fa-heart ${liked && 'active'}`}
        onClick={handleToggleLike}
        text={liked ? 'UNLIKE' : 'LIKE'}
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

TrackInfo.propTypes = {
  liked: PropTypes.bool,
  trackDesc: PropTypes.string,
  trackTitle: PropTypes.string,
  trackCreatedAt: PropTypes.string,
  artistLinkUrl: PropTypes.string,
  artistName: PropTypes.string,
  handleToggleLike: PropTypes.func
};

export default TrackInfo;
