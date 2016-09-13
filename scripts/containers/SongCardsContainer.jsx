import React, { Component } from 'react';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import { connect } from 'react-redux';
import { GENRES, DEFAULT_GENRE } from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import { fetchSongsOnScroll } from '../actions/playlists';
import { pauseSong, changeSong, changeSongAndPlay } from '../actions/player';
import * as selectors from '../selectors/songCardsSelectors';
// Main container
class SongCardsContainer extends Component {

  constructor(props) {
    super(props);
    // First param passed into bind will be bound as 'this' inside renderPlaylist
    // Bind: creates a copy of function and tells it what this is.
    this.renderSongCards = this.renderSongCards.bind(this);
  }

  renderSongCards () {
    const { genre, playlists } = this.props;
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
    console.log('SongCardsContainer Render');
    return (
    <div>
      {this.renderSongCards()}
    </div>
    );
  }

}

const mapStateToProps = (state) => ({
  playlists: state.playlists,
  genre: selectors.getVisiblePlaylistName(state),
  songs: selectors.getVisibleSongsAsArray(state), // may break on search
  isFetching: selectors.getFetchState(state),
  isPlaying: selectors.getPlayingState(state),
  currentSong: selectors.getCurrentSong(state),
})

const mapDispatchToProps = (dispatch) => ({
  // We need to match dispatch only because InfiniteScroll relies on it.
  dispatch,
  handleChangeSong (newSongId, genre) { dispatch(changeSongAndPlay(newSongId, genre)); },
  handlePauseSong () { dispatch(pauseSong()); }
})

// withRouter is handy when you need to inject params from the router into components that are deep down
// so that we do not have to pass it all the way down.
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongCardsContainer);
