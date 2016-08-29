import React, { Component } from 'react';
import SongCard from '../components/SongCard';
import Spinner from 'Spinner';

class SongCards extends Component {
  constructor(props) {
    super(props);
    this.renderSongCards = this.renderSongCards.bind(this);
  }

  renderSongCards() {
    const {genre, playlists} = this.props;
    if (genre in playlists) {
      return playlists[genre].songs.map((song, i) => {
        return (
          <div className="col-1-5 clearfix" key={i}>
              <SongCard song={song} />
          </div>
        );
      });
    }
  }

  render() {
    const {genre, playlists} = this.props;

    return (
      <div className="content">
        <div className="songs-row grid">
          {this.renderSongCards()}
        </div>
      </div>
    );
  }
}

export default SongCards;
