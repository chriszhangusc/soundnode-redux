import React, { Component} from 'react';

class SongCard extends Component {
  renderTogglePlayButton() {
  }

  render() {
    let image = 'https://i1.sndcdn.com/artworks-000086872057-k6h2xo-t300x300.jpg';
    return (
      <div className="card song-card">
        <div className="song-card-image" style={{ backgroundImage: `url(${image})` }}>
        </div>
        <div className="song-card-user clearfix">
          <img
            className="song-card-user-image"
            src={"https://i1.sndcdn.com/avatars-000199251026-3etsd7-large.jpg"}
          />
          <div className="song-card-details">
            <a className="song-card-title">
              Fight
            </a>
            <a className="song-card-user-username">
              Monster Cat
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SongCard;
