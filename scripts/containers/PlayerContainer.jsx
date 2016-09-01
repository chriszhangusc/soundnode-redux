import React, {Component} from 'react';
import Player from '../components/Player';
import {connect} from 'react-redux';
import {playSong, pauseSong} from '../actions/player';

class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const { player } = this.props;
    // Should we do this in player or here
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
    pauseSong: () => { dispatch(pauseSong()); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
