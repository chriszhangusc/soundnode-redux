import React, { Component } from 'react';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import { connect } from 'react-redux';
import { GENRES, DEFAULT_GENRE } from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import { fetchSongsOnScroll } from '../actions/playlists';
import { pauseSong, changeSongAndPlay } from '../actions/player';
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
    return (
      <div className="container">
        <SongCards
          {...this.props}
          />
      </div>
    );
  }

  render () {
    return this.renderSongCards();
  }

}

const mapStateToProps = (state) => ({
  visiblePlaylistName: selectors.getVisiblePlaylistName(state),
  songs: selectors.getVisibleSongsAsArray(state), // may break on search
  isFetching: selectors.getFetchState(state),
  isPlaying: selectors.getPlayingState(state),
  currentSong: selectors.getCurrentSong(state),
})

const mapDispatchToProps = (dispatch) => ({
  handleChangeSong (newSongId) { dispatch(changeSongAndPlay(newSongId)); },
  handlePauseSong () { dispatch(pauseSong()); },
  scrollFunc () { dispatch(fetchSongsOnScroll()); }
})

// withRouter is handy when you need to inject params from the router into components that are deep down
// so that we do not have to pass it all the way down.
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SongCardsContainer);
