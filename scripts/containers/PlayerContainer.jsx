import React, {Component} from 'react';
import Player from '../components/Player';
import {connect} from 'react-redux';
import {playSong, pauseSong, changeSongAndPlay, handleTimeUpdate, handleSeekTimeUpdate, playNextSong, playPrevSong, toggleSeek, handleSongEnded} from '../actions/player';

class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    // Should we do this in player or here: YES
    const {player} = this.props;

    if (player.song === null) {
      return null;
    } else {
      return <Player {...this.props}/>;
    }
  }

}

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
}

const mapDispatchToProps = (dispatch) => {

  return {
    dispatch,
    playSong: (song) => { dispatch(changeSongAndPlay(song)); },
    pauseSong: () => { dispatch(pauseSong()); },
    handleTimeUpdate: (newTime) => { dispatch(handleTimeUpdate(newTime)) },
    handleSeekTimeUpdate: (newTime) => { dispatch(handleSeekTimeUpdate(newTime)) },
    handlePrev: () => {dispatch(playPrevSong())},
    handleNext: () => {dispatch(playNextSong())},
    toggleSeek: () => {dispatch(toggleSeek())},
    handleSongEnded: () => {dispatch(handleSongEnded())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
