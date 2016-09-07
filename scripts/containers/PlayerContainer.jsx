// Import React Redux
import React, {Component} from 'react';
import {connect} from 'react-redux';
// Import Actions and Utils
import * as PlayerActions from '../actions/player';
import {computeNewTimeOnSeek} from '../utils/PlayerUtils';
import {generateStreamUrl} from '../utils/SongUtils';
// Import Components
import Player from '../components/Player';
import PlayerAudio from '../components/PlayerAudio';

class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    // Extract props that we care, and pass the other props as others.
    const {player, ...others} = this.props;
    if (player.song === null) return null;

    const streamUrl = generateStreamUrl(player.song);
    return (
      <div>
        <PlayerAudio
          player={player}
          src={streamUrl}
          {...others}
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
    onLoadedMetadata: (audioElement) => { dispatch(PlayerActions.changeDuration(Math.floor(audio.duration))) },
    // PlayerControls functions:
    onPlayClick: () => { dispatch(PlayerActions.playSong()) },
    onPauseClick: () => { dispatch(PlayerActions.pauseSong()) },
    onNextClick: () => { dispatch(PlayerActions.playNextSong()) },
    onPrevClick: () => { dispatch(PlayerActions.playPrevSong()) },
    // PlayerDurationBar functions
    onDurationHandleMouseDown: () => { dispatch(PlayerActions.beginSeek()) },
    onDurationHandleMouseUp: () => { dispatch(PlayerActions.endSeek()) },
    onDurationHandleMouseMove: (seekBar, duration, e) => { dispatch(PlayerActions.updateTimeOnSeek(e, seekBar, duration)) },
    onDurationBarMouseUp: (seekBar, duration, e) => { dispatch(PlayerActions.updateTimeOnSeek(e, seekBar, duration)) },
    onDurationBarMouseDown: () => { dispatch(PlayerActions.beginSeek()) },
    // VolumeBar functions
    onVolumeHandleMouseDown: () => { dispatch(PlayerActions.beginVolumeSeek()) },
    onVolumeHandleMouseUp: () => { dispatch(PlayerActions.endVolumeSeek()) },
    onVolumeHandleMouseMove: (volumeBar, e) => { dispatch(PlayerActions.updateVolumeOnSeek(e, volumeBar)) },
    onVolumeBarMouseDown: () => { dispatch(PlayerActions.beginVolumeSeek()) },
    onVolumeBarMouseUp: (volumeBar, e) => { dispatch(PlayerActions.updateVolumeOnSeek(e, volumeBar)) },
    onToggleMuteClick: () => { dispatch(PlayerActions.toggleMute()) }, 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
