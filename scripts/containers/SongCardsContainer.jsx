import React, {Component} from 'react';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import {connect} from 'react-redux';
import {GENRES} from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import {fetchSongsOnScroll} from '../actions/playlists';

// Main container
class SongCardsContainer extends Component {

  constructor(props) {
    super(props);
    // First param passed into bind will be bound as 'this' inside renderPlaylist
    // Bind: creates a copy of function and tells it what this is.
    this.renderPlaylist = this.renderPlaylist.bind(this);
  }

  renderPlaylist() {
    const { playlists, dispatch } = this.props;
    const genre = this.props.params.genre;
    const isFetching = playlists[genre].isFetching;
    return (
      <div className="container">
        <SongCards playlists={playlists} genre={genre} dispatch={dispatch} scrollFunc={fetchSongsOnScroll.bind(null, genre, playlists)} />
        {isFetching ? <Spinner /> : null}
    </div>

    );
  }

  render () {
    return (
      <div className="songs">
        <Toolbar />
        {this.renderPlaylist()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
  };
};

export default connect(mapStateToProps)(SongCardsContainer);
