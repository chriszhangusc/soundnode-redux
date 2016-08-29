import React, { Component} from 'react';

class SongCard extends Component {
  renderTogglePlayButton() {
  }

  render() {
    const {song} = this.props;
    let imageUrl = song.artwork_url ? song.artwork_url.replace('large', 't300x300') : '';

    return (
      <div className="card song-card">
        <div className="song-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
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
}

export default SongCard;
