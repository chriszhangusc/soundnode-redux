import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CLIENT_ID} from '../constants/Config';
import * as PlayerActions from '../actions/player';

import Player from '../components/Player';
import PlayerAudio from '../components/PlayerAudio';
import {computeNewTimeOnSeek} from '../utils/PlayerUtils';
import {generateStreamUrl} from '../utils/SongUtils';
class PlayerContainer extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    // Should we do this in player or here: YES
    const {player, onTimeUpdate, onEnded, onLoadedMetadata} = this.props;

    if (player.song === null) return null;

    // Put this in a util function
    const streamUrl = generateStreamUrl(player.song);

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
