import React, {Component} from 'react';
import Player from '../components/Player';
import {connect} from 'react-redux';
import {pauseSong, playSong} from '../actions/player';
import { bindActionCreators } from 'redux';
class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const { player, dispatch } = this.props;
    // Should we do this in player or here
    return player.song === null ? null :
    <Player player={player}
          pauseSong={() => { dispatch(pauseSong()) }}
          playSong={() => { dispatch(playSong(player.song))}} />;
  }

}

const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
}

export default connect(mapStateToProps)(PlayerContainer);
