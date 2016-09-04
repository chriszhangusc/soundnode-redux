import React, {Component} from 'react';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import {connect} from 'react-redux';
import {GENRES} from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import {fetchSongsOnScroll} from '../actions/playlists';
import PlayerContainer from './PlayerContainer';
import {pauseSong, changeSong, changeSongAndPlay} from '../actions/player';
// Main container
class SongCardsContainer extends Component {

  constructor(props) {
    super(props);
    // First param passed into bind will be bound as 'this' inside renderPlaylist
    // Bind: creates a copy of function and tells it what this is.
  }

  renderSongCards () {
    const { playlists, dispatch, player } = this.props;
    const genre = this.props.params.genre;
    const isFetching = playlists[genre].isFetching;
    return (
      <div className="container">
        <SongCards
          playlists={playlists}
          genre={genre}
          dispatch={dispatch}
          scrollFunc={fetchSongsOnScroll.bind(null, genre, playlists)}
          player={player}
          {...this.props}
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
    player: state.player,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // We need to match dispatch only because InfiniteScroll relies on it.
    dispatch,
    handleChangeSong: (newSong) => {
      dispatch(changeSongAndPlay(newSong));
    },

    handlePauseSong: () => {
      dispatch(pauseSong());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongCardsContainer);
