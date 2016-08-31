import React, {Component} from 'react';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import {connect} from 'react-redux';
import {GENRES} from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import {fetchSongsOnScroll} from '../actions/playlists';
import PlayerContainer from './PlayerContainer';
import {playSong, pauseSong} from '../actions/activeSong';
// Main container
class SongCardsContainer extends Component {

  constructor(props) {
    super(props);
    // First param passed into bind will be bound as 'this' inside renderPlaylist
    // Bind: creates a copy of function and tells it what this is.
    this.renderSongCards = this.renderSongCards.bind(this);
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.handlePauseSong = this.handlePauseSong.bind(this);
  }

  handlePlaySong (song) {
    const {dispatch} = this.props;
    dispatch(playSong(song));
  };

  handlePauseSong() {
    const {dispatch} = this.props;
    dispatch(pauseSong());
  }

  renderSongCards () {
    const { playlists, dispatch, activeSong } = this.props;
    const genre = this.props.params.genre;
    const isFetching = playlists[genre].isFetching;
    return (
      <div className="container">
        <SongCards
          playlists={playlists}
          handlePlaySong={this.handlePlaySong}
          handlePauseSong={this.handlePauseSong}
          genre={genre}
          dispatch={dispatch}
          scrollFunc={fetchSongsOnScroll.bind(null, genre, playlists)}
          activeSong={activeSong}
          />
        {isFetching ? <Spinner /> : null}
      </div>
    );
  }

  render () {
    return (
      <div className="songs">
        <Toolbar />
        {this.renderSongCards()}
        <PlayerContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
    activeSong: state.activeSong, 
  };
};

export default connect(mapStateToProps)(SongCardsContainer);
