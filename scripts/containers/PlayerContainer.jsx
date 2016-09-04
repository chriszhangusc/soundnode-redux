import React, {Component} from 'react';
import Player from '../components/Player';
import {connect} from 'react-redux';
import {seek, playSong, pauseSong, changeSongAndPlay, handleTimeUpdate, handleSeekTimeUpdate, playNextSong, playPrevSong, toggleSeek, handleSongEnded} from '../actions/player';

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
};



const mapDispatchToProps = (dispatch) => {

  return {
    dispatch,
    handleTimeUpdate: (newTime) => { dispatch(handleTimeUpdate(newTime)) },
    handleSeekTimeUpdate: (newTime) => { dispatch(handleSeekTimeUpdate(newTime)) },
    playPrevSong: () => {dispatch(playPrevSong())},
    playNextSong: () => {dispatch(playNextSong())},
    toggleSeek: () => {dispatch(toggleSeek())},
    handleSongEnded: () => {dispatch(handleSongEnded())},
    onPauseClick: (audioElement) => { dispatch(pauseSong()); audioElement.pause();},
    onPlayClick: (song, audioElement) => { dispatch(changeSongAndPlay(song, audioElement)); },

    // Durating bar functions
    onSeekMouseDown: () => { dispatch(toggleSeek()); },
    onSeekMouseUp: (audioElement, newTime) => { dispatch(toggleSeek()); audioElement.currentTime = newTime; },
    onSeekMouseMove: (e, seekBar, audioElement) => { dispatch(seek(e, seekBar, audioElement, false)); },
    onDurationBarClick: (e, seekBar, audioElement) => { dispatch(seek(e, seekBar, audioElement, true)); },

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
