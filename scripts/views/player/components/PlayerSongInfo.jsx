import React, { PropTypes } from 'react';

const PlayerSongInfo = ({ username, title, artworkUrl }) => (
  <div className="player-section player-info">
    <img alt="artwork pic" className="player-image" src={artworkUrl} />
    <div className="player-song-card-details">
      <a className="song-card-title">
        {title}
      </a>
      <a className="song-card-username">
        {username}
      </a>
    </div>
  </div>
);

PlayerSongInfo.propTypes = {
  username: PropTypes.string,
  title: PropTypes.string,
  artworkUrl: PropTypes.string
};


export default PlayerSongInfo;
