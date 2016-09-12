// Import React Redux
import React, {Component} from 'react';
import {connect} from 'react-redux';
// Import Actions and Utils
import * as PlayerActions from '../actions/player';
import {computeNewTimeOnSeek} from '../utils/PlayerUtils';

// Import Components
import Player from '../components/Player';
import PlayerAudio from '../components/PlayerAudio';
import {LOOP, REPEAT, SHUFFLE} from '../constants/PlayerConstants';
import * as selectors from '../selectors/playerSelectors';

class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    // Extract props that we care, and pass the other props as others.
    const {currentSong} = this.props;
    if (!currentSong) return null;

    return (
      <div>
        <PlayerAudio {...this.props} />
        <Player {...this.props} />
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    isPlaying: selectors.getPlayingState(state),
    duration: selectors.getDuration(state),
    currentSong: selectors.getCurrentSong(state),
    streamUrl: selectors.getStreamUrl(state),
    currentTime: selectors.getCurrentTime(state),
    isSeeking: selectors.getSeekStatus(state),
    volume: selectors.getCurrentVolume(state),
    volumeIsSeeking: selectors.getVolumeSeekState(state),
  };
};

// mapDispatchToProps will be re-invoked whenever the component receives new props.
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    dispatch,
    // PlayerAudio functions:
    onTimeUpdate: (e) => { dispatch(PlayerActions.onTimeUpdate(e.target.currentTime)) },
    onEnded: () => { dispatch(PlayerActions.playNextSongByCurrentMode()) },
    onLoadedMetadata: (audioElement) => { dispatch(PlayerActions.changeDuration(Math.floor(audioElement.duration))) },
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
    // Player Mode Controls
    onRepeatClick: () => { dispatch(PlayerActions.changePlayMode(REPEAT)) },
    onShuffleClick: () => { dispatch(PlayerActions.changePlayMode(SHUFFLE)) },
    // VolumeBar functions
    onVolumeHandleMouseDown: () => { dispatch(PlayerActions.beginVolumeSeek()) },
    onVolumeHandleMouseUp: () => { dispatch(PlayerActions.endVolumeSeek()) },
    onVolumeHandleMouseMove: (volumeBar, e) => { dispatch(PlayerActions.updateVolumeOnSeek(e, volumeBar)) },
    onVolumeBarMouseDown: () => { dispatch(PlayerActions.beginVolumeSeek()) },
    onVolumeBarMouseUp: (volumeBar, e) => { dispatch(PlayerActions.updateVolumeOnSeek(e, volumeBar)) },
    onToggleMuteClick: () => { dispatch(PlayerActions.toggleMute()) },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
