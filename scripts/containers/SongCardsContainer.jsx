import React, {Component} from 'react';
import Toolbar from '../components/Toolbar';
import SongCards from '../components/SongCards';
import {connect} from 'react-redux';
import {GENRES} from '../constants/SongConstants';
import Spinner from '../components/Spinner';
import {fetchSongsByGenre} from '../actions/playlists';

// Main container
class SongCardsContainer extends Component {

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

  renderPlaylist() {
    const { playlists } = this.props;
    const genre = this.props.params.genre;
    if (!(genre in playlists)) {
      return;
    }
    if (playlists[genre].isFetching) {
      return <Spinner />;
    } else {
      return (
        <div className="container">
          <SongCards playlists={playlists} genre={genre}/>
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

export default connect(mapStateToProps)(SongCardsContainer);
