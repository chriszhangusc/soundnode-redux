import React, {Component} from 'react';
import Player from '../components/Player';
import {connect} from 'react-redux';
import * as playerActions from '../actions/activeSong';
import { bindActionCreators } from 'redux';
class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const { activeSong, pauseSong, playSong, dispatch } = this.props;
    // Should we do this in player or here
    return activeSong.song === null ? null :
    <Player activeSong={activeSong}
          pauseSong={() => {dispatch(playerActions.pauseSong())}}
          playSong={() => { dispatch(playerActions.playSong(activeSong.song))}} />;
  }

}

const mapStateToProps = (state) => {
  return {
    activeSong: state.activeSong,
  };
}

export default connect(mapStateToProps)(PlayerContainer);
