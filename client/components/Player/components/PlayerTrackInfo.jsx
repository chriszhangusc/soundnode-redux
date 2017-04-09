import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import defaultArtworkImage from 'assets/images/default-artwork.png';

// DUMB DUMB DUMB
const PlayerTrackInfo = ({
  artworkUrl,
  trackTitle,
  artistName,
  trackUrl,
  artistUrl,
}) => (
  <div className="player-section player-info">
    <Link to={trackUrl} >
      <img
        alt="Not Found"
        className="player-image"
        src={artworkUrl || defaultArtworkImage}
      />
    </Link>
    <div className="player-song-card-details">
      <Link to={trackUrl} className="song-card-title">
        {trackTitle}
      </Link>
      <Link to={artistUrl} className="song-card-username">
        {artistName}
      </Link>
    </div>
  </div>
);

PlayerTrackInfo.defaultProps = {
  artworkUrl: '',
  trackUrl: '',
  artistUrl: '',
  artistName: '',
  trackTitle: '',
};

PlayerTrackInfo.propTypes = {
  artworkUrl: PropTypes.string,
  trackUrl: PropTypes.string,
  artistUrl: PropTypes.string,
  artistName: PropTypes.string,
  trackTitle: PropTypes.string,
};


export default PlayerTrackInfo;
