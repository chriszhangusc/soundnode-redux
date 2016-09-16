import React, {PropTypes} from 'react';

const PlayerSongInfo = ({ username, title, artworkUrl }) => {
    return (
      <div className="player-section player-info">
        <img className="player-image" src={artworkUrl} />
        <div className="song-card-details">
          <a className="song-card-title">
            {title}
          </a>
          <a className="song-card-user-username">
            {username}
          </a>
        </div>
      </div>
    );
};

PlayerSongInfo.propTypes = {
  username: PropTypes.string,
  title: PropTypes.string,
  artworkUrl: PropTypes.string
};


export default PlayerSongInfo;
