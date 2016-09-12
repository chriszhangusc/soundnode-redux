import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import { connect } from 'react-redux';
import { GENRES, DEFAULT_GENRE } from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import { fetchSongsOnScroll } from '../actions/playlists';
import { pauseSong, changeSong, changeSongAndPlay } from '../actions/player';
import { getPlayerState, getCurrentTime } from '../reducers';
import { getSongsAsArray, getFetchState, getCurrentSong , getPlaylistName } from '../selectors';
import { delay } from '../utils/DelayUtils';
import { isEqual } from 'lodash';
// Main container
class SongCardsContainer extends Component {

  constructor(props) {
    super(props);
    // First param passed into bind will be bound as 'this' inside renderPlaylist
    // Bind: creates a copy of function and tells it what this is.
    this.renderSongCards = this.renderSongCards.bind(this);
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

  shouldComponentUpdate(nextProps) {
    return true;
  }


  render () {
    console.log('SongCardsContainer Render');
    return (
    <div>
      {this.renderSongCards()}
    </div>
    );
  }

}


// Mapping everything is bad, use selector instead
const mapStateToProps = (state, { params }) => ({
  genre: getPlaylistName(state),
  isFetching: getFetchState(state),
  isPlaying: getPlayerState(state),
  songs: getSongsAsArray(state), // may break on search
  playlists: state.playlists,
  currentSong: getCurrentSong(state),
})

const mapDispatchToProps = (dispatch) => ({
  // We need to match dispatch only because InfiniteScroll relies on it.
  dispatch,
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
