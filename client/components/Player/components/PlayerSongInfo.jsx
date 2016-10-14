import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PlayerSongInfo = ({ trackId, artistId, username, title, artworkUrl }) => (
  <div className="player-section player-info">
    <img alt="artwork pic" className="player-image" src={artworkUrl} />
    <div className="player-song-card-details">
      <Link to={`/track/${trackId}`} className="song-card-title">
        {title}
      </Link>
      <Link to={`/artist/${artistId}`} className="song-card-username">
        {username}
      </Link>
    </div>
  </div>
);

PlayerSongInfo.propTypes = {
  trackId: PropTypes.number,
  artistId: PropTypes.number,
  username: PropTypes.string,
  title: PropTypes.string,
  artworkUrl: PropTypes.string
};


export default PlayerSongInfo;
