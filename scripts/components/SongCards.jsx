import React, { Component } from 'react';
import SongCard from '../components/SongCard';
import Spinner from './Spinner';
import infiniteScroll from './hocs/InfiniteScroll';
import { formatImageUrl } from '../utils/FormatUtils';

class SongCards extends Component {
  constructor(props) {
    super(props);
    this.renderSongCards = this.renderSongCards.bind(this);
  }

  render() {
    const { isFetching } = this.props;
    return (

      <div className="content">
          {this.renderSongCards()}
          {isFetching ? <Spinner /> : null}
      </div>
    );
  }


  renderSongCards() {
    const { currentSong, songs, visiblePlaylistName, isPlaying } = this.props;
    const { handlePauseSong, handleChangeSong } = this.props;
    // These logic should be rewritten!
    let rows = [];
      // Five cols a row
    const COLS = 5;

    for (let i = 0; i < songs.length; i += COLS) {
      let rowItems = songs.slice(i, i + COLS);
      let row = (
        <div className="songs-row grid" key={i} >
          {
            rowItems.map((song, i) => {
              const isActive = currentSong ? song.id === currentSong.id : false;
              return (
                <div className="col-1-5 clearfix" key={i}>
                  <SongCard
                    song={song}
                    imageUrl={formatImageUrl(song.artwork_url)}
                    isPlaying={isPlaying}
                    handleChangeSong={handleChangeSong.bind(null, song.id, visiblePlaylistName)}
                    handlePauseSong={handlePauseSong}
                    isActive={isActive}
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


}

export default infiniteScroll(SongCards);
