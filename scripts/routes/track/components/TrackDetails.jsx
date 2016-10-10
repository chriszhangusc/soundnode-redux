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
}) => {
  if (isFetching) {
    return <Spinner />;
  }
  console.log(description);
  return (
    <div className="container">
      <div className="track-info-container">
        <div className="track-avatar">
          <img alt="Track Avatar" src={artworkUrl} />
        </div>
        <div className="track-details">
          <h1 className="track-title">{title}</h1>
          <div className="track-artist-name">Artist: {artistName}</div>
          <div className="track-artist-name">Created At: {createdAt}</div>
          <div className="track-description"><p>{description}</p></div>
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
  createdAt: PropTypes.string
};

export default TrackDetails;
