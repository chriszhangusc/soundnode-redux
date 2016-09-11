import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import { connect } from 'react-redux';
import { GENRES, DEFAULT_GENRE } from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import { fetchSongsOnScroll } from '../actions/playlists';
import PlayerContainer from './PlayerContainer';
import { pauseSong, changeSong, changeSongAndPlay } from '../actions/player';
import { getSongsAsArray, getFetchState, getPlayerState, getCurrentSong } from '../reducers';
// Main container
class SongCardsContainer extends Component {

  constructor(props) {
    super(props);
    // First param passed into bind will be bound as 'this' inside renderPlaylist
    // Bind: creates a copy of function and tells it what this is.
  }

  renderSongCards () {
    const { dispatch, genre, isFetching, playlists } = this.props;
    return (
      <div className="container">
        <SongCards
          scrollFunc={fetchSongsOnScroll.bind(null, genre, playlists)}
          {...this.props}
          />
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

// Mapping everything is bad, use selector instead
const mapStateToProps = (state, { params }) => ({
  playlists: state.playlists,
  genre: params.genre || DEFAULT_GENRE,
  isFetching: getFetchState(state, params.genre),
  isPlaying: getPlayerState(state),
  songs: getSongsAsArray(state, params.genre), // may break on search
  currentSong: getCurrentSong(state),
})

const mapDispatchToProps = (dispatch) => ({
  // We need to match dispatch only because InfiniteScroll relies on it.
  dispatch,
  // Short hand version when writing functions inside
  handleChangeSong (newSongId) { dispatch(changeSongAndPlay(newSongId)); },
  handlePauseSong () { dispatch(pauseSong()); }
})

// withRouter is handy when you need to inject params from the router into components that are deep down
// so that we do not have to pass it all the way down.
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongCardsContainer)
);
