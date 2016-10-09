import React, { PropTypes } from 'react';
import Spinner from 'client/components/Spinner';

const TrackDetails = ({
  isFetching,
  artworkUrl,
  description,
  title
}) => {
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="container">
      <div className="track-info-container">
        <div className="track-avatar">
          <img alt="Track Avatar" src={artworkUrl} />
        </div>
        <div className="track-details">
          <h1 className="track-title">{title}</h1>
          <div className="track-artist-name">Artist Name</div>
          <div className="track-description">{description}</div>
        </div>
      </div>
    </div>
  );
};

TrackDetails.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  artworkUrl: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string
};

export default TrackDetails;
