import React, {Component} from 'react';
import Player from '../components/Player';
import {connect} from 'react-redux';
import {playSong, pauseSong, handleTimeUpdate, playNextSong, playPrevSong} from '../actions/player';

class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    // Should we do this in player or here
    const {player} = this.props;
    return player.song === null ? null :
    <Player {...this.props} />;
  }

}

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
}

const mapDispatchToProps = (dispatch) => {

  return {
    playSong: (song) => { dispatch(playSong(song)); },
    pauseSong: () => { dispatch(pauseSong()); },
    handleTimeUpdate: (e) => { dispatch(handleTimeUpdate(e)) },
    handlePrev: () => {dispatch(playPrevSong())},
    handleNext: () => {dispatch(playNextSong())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
