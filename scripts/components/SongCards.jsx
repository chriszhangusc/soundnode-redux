import React, { Component } from 'react';
import SongCard from '../components/SongCard';
import Spinner from './Spinner';
import infiniteScroll from './InfiniteScroll';

class SongCards extends Component {
  constructor(props) {
    super(props);
    this.renderSongCards = this.renderSongCards.bind(this);
  }

  renderSongCards() {
    const {genre, playlists, handlePauseSong, handleChangeSong, player} = this.props;
    let rows = [];

      // Five cols a row
      const COLS = 5;
      const songs = playlists[genre].songs;

      for (let i = 0; i < songs.length; i += COLS) {
        let rowItems = songs.slice(i, i + COLS);
        let row = (
          <div className="songs-row grid" key={i}>
            {
              rowItems.map((song, i) => {
                return (
                  <div className="col-1-5 clearfix" key={i}>
                    <SongCard key={song.id}
                      song={song}
                      handleChangeSong={handleChangeSong}
                      handlePauseSong={handlePauseSong}
                      isActive={player.song ? player.song.id === song.id : false}
                      player={player}
                      />
                  </div>
                );
              })
            }
          </div>
        );
        rows.push(row);
      }
    return rows;
  }

  render() {
    const {genre, playlists} = this.props;

    return (
      <div className="content">
        {this.renderSongCards()}
      </div>
    );
  }
}

export default infiniteScroll(SongCards);
