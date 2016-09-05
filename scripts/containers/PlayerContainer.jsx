import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CLIENT_ID} from '../constants/Config';
import * as PlayerActions from '../actions/player';

import Player from '../components/Player';
import PlayerAudio from '../components/PlayerAudio';
import {computeNewTimeOnSeek} from '../utils/PlayerUtils';

class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {

  }

  render () {
    // Should we do this in player or here: YES
    const {player, onTimeUpdate, onEnded, onLoadedMetadata} = this.props;

    if (player.song === null) return null;

    // Put this in a util function
    const streamUrl = `${player.song.stream_url}?client_id=${CLIENT_ID}`;

    return (
      <div>
        <PlayerAudio
          player={player}
          src={streamUrl}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          onLoadedMetadata={onLoadedMetadata}
          />
        <Player {...this.props} />
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    player: state.player,
  };
};

// mapDispatchToProps will be re-invoked whenever the component receives new props.
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    dispatch,
    // PlayerAudio functions:
    onTimeUpdate: (e) => { dispatch(PlayerActions.onTimeUpdate(e.target.currentTime)) },
    onEnded: () => { dispatch(PlayerActions.onEnded()) },
    onLoadedMetadata: (duration) => { dispatch(PlayerActions.changeDuration(Math.floor(duration))) },
    // PlayerControls functions:
    onPlayClick: () => { dispatch(PlayerActions.playSong()); },
    onPauseClick: () => { dispatch(PlayerActions.pauseSong());},
    onNextClick: () => {dispatch(PlayerActions.playNextSong())},
    onPrevClick: () => {dispatch(PlayerActions.playPrevSong())},

    // PlayerDurationBar functions
    onSeekMouseDown: () => { dispatch(PlayerActions.beginSeek()); },
    onSeekMouseUp: () => { dispatch(PlayerActions.endSeek()); },
    onSeekMouseMove: (e, seekBar, duration) => {
      let newTime = computeNewTimeOnSeek(e, seekBar, duration);
      dispatch(PlayerActions.onSeekTimeUpdate(newTime));
    },
    onDurationBarMouseUp: (e, seekBar, duration) => {
      let newTime = computeNewTimeOnSeek(e, seekBar, duration);
      dispatch(PlayerActions.onSeekTimeUpdate(newTime));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
