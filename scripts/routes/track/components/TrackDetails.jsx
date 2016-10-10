import React, { PropTypes } from 'react';
import Spinner from 'client/components/Spinner';

const TrackDetails = ({
  isFetching,
  artworkUrl,
  description,
  title,
  artistName,
  createdAt,
  commentCount,
  playbackCount,
  likedCount,
  isLiked
}) => {
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="container">
      <div className="track-info-container">
        <div className="track-avatar">
          <img className="track-image" alt="Track Avatar" src={artworkUrl} />
          <div className="image-details-bar">
            <span className="playback-count">
              <i className="fa fa-play" /> {playbackCount}
            </span>
            <span className="likes-count">
              <i className="fa fa-heart" /> {likedCount}
            </span>
          </div>
        </div>
        <div className="track-details">
          <h1 className="track-title">{title}</h1>
          <div className="track-artist-name">Artist: {artistName}</div>
          <div className="track-artist-name">Created At: {createdAt}</div>
          <div className="track-description"><p>{description}</p></div>
          <div className="track-controls">
            <button className="button inline">
              <i className="fa fa-bookmark" /><span>ADD TO PLAYLIST</span>
            </button>
            <button className="button inline">
              <i className="fa fa-external-link" />
              <span>PERMALINK</span>
            </button>
            <button className="button inline">
              <i className="fa fa-clipboard" />
              <span>COPY TRACK LINK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TrackDetails.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  artworkUrl: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  artistName: PropTypes.string,
  createdAt: PropTypes.string,
  isLiked: PropTypes.bool,
  // As those numbers will be formatted as string.
  likedCount: PropTypes.string,
  playbackCount: PropTypes.string,
  commentCount: PropTypes.string
};

export default TrackDetails;
