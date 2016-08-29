import React, {Component} from 'react';
import Toolbar from 'Toolbar';
import SongCards from 'SongCards';
import {connect} from 'react-redux';
import {GENRES} from '../constants/SongConstants';
import Spinner from './Spinner';
import {fetchSongsByGenre} from '../actions/playlists.js';
// Container
class Playlist extends Component {

  constructor(props) {
    super(props);
    this.renderPlaylist = this.renderPlaylist.bind(this);
  }

  componentWillMount() {
    const {dispatch, playlists} = this.props;
    dispatch(fetchSongsByGenre(this.props.params.genre));
  }

  componentWillReceiveProps(nextProps) {
    const genre = nextProps.params.genre;
    const {dispatch, playlists} = this.props;
    if (!(genre in playlists)) {
        dispatch(fetchSongsByGenre(genre));
    }
  }

  // handleOnClick(genre) {
  //   // Fire an action to change the current genre and fetch songs related to that genre
  //   const {dispatch, playlists} = this.props;
  //   dispatch(fetchSongsByGenre(this.props.params.genre));
  // }

  renderPlaylist() {
    const { playlists } = this.props;
    const genre = this.props.params.genre;
    if ((genre in playlists) && playlists[genre].isFetching) {
      return <Spinner />;
    } else {
      return (
        <div className="container">
          <SongCards />
        </div>
      );
    }
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

export default connect(mapStateToProps)(Playlist);
