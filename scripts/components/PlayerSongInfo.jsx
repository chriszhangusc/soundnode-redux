import React, {Component, PropTypes} from 'react';

class PlayerSongInfo extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {currentSong} = this.props;
    const title = currentSong.title;
    const username = currentSong.user.username;
    return (
      <div className="player-section player-info">
        <img className="player-image" src={currentSong.artwork_url} />
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
  }
}

const propTypes = {
};

PlayerSongInfo.propTypes = propTypes;

export default PlayerSongInfo;
