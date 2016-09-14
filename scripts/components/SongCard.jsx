import React, { Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SongCard extends Component {

  constructor (props) {
    super(props);
    this.renderTogglePlayButton = this.renderTogglePlayButton.bind(this);
    this.renderSongCardDetails = this.renderSongCardDetails.bind(this);
  }

  renderTogglePlayButton () {
    const {isPlaying, isActive, handlePauseSong, handleChangeSong} = this.props;

    if (isActive && isPlaying) {
      return (
        <div className={`toggle-play-button ${(isActive ? 'active' : '')}`} onClick={handlePauseSong}>
          <i className="toggle-play-button-icon ion-ios-pause" />
        </div>
      );
    } else {
      return (
        <div className={`toggle-play-button ${(isActive ? 'active' : '')}`} onClick={handleChangeSong}>
          <i className="toggle-play-button-icon ion-ios-play" />
        </div>
      );
    }
  }

  renderSongCardDetails() {
    const {song, isActive, imageUrl} = this.props;
    return (
      <div ref="songCard" className={`card song-card ${(isActive ? 'active' : '')}`}>
        <div className="song-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
          {this.renderTogglePlayButton()}
        </div>
        <div className="song-card-user clearfix">

          <img
            className="song-card-user-image"
            src={song.user.avatar_url}
          />
          <div className="song-card-details">
            <a className="song-card-title">
              {song.title}
            </a>
            <a className="song-card-user-username">
              {song.user.username}
            </a>
          </div>
        </div>
      </div>
    );
  }

  render() {

    return this.renderSongCardDetails();
  }
}

export default SongCard;
