import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT } from 'features/player/playerConsts';
import { connect } from 'react-redux';
import { getStreamUrl } from 'common/utils/apiUtils';
import * as playerActions from 'features/player/playerActions';

import {
  getCurrentTime,
  getCurrentVolume,
  getPlayerMode,
  isPlayerPlaying,
  isPlayerSeeking,
} from 'features/player/playerSelectors';

class PlayerAudio extends Component {
  componentDidMount() {
    this.togglePlayIfNeeded(this.audio, this.props);
  }

  componentDidUpdate(prevProps) {
    this.updateTimeIfNeeded(prevProps);
    this.updateVolumeIfNeeded(prevProps);
    this.togglePlayIfNeeded(this.audio);
  }

  // If seeking status changed from true to false, then we should update time in our audio
  updateTimeIfNeeded = (prevProps) => {
    if (prevProps.seeking && !this.props.seeking) {
      this.audio.currentTime = this.props.currentTime;
    }
    // Reason: In case of repeat mode, when user click next/prev song button,
    // we will update currentTime to 0, so we need to force update the actual
    // time of our player.
    if (prevProps.currentTime !== 0 && this.props.currentTime === 0) {
      this.audio.currentTime = this.props.currentTime;
    }
  };

  updateVolumeIfNeeded = (prevProps) => {
    if (prevProps.volume !== this.props.volume) {
      this.audio.volume = this.props.volume;
    }
  };

  togglePlayIfNeeded = (audio) => {
    // This also covers change song and play logic
    if (audio.paused === this.props.playing) {
      if (audio.paused) {
        audio.play().then(() => {
          console.log('Start playing');
        });
      } else {
        audio.pause();
      }
    }
  };

  handleTimeUpdate = (e) => {
    this.props.updateTimeOnPlay(e.target.currentTime);
  };

  handleEnded = () => {
    this.props.playNextSong();
  };

  render() {
    const { streamUrl, mode } = this.props;
    return (
      <audio
        id="audio"
        loop={mode === REPEAT}
        ref={(ref) => {
          this.audio = ref;
        }}
        src={streamUrl}
        onEnded={this.handleEnded}
        onTimeUpdate={this.handleTimeUpdate}
      />
    );
  }
}

PlayerAudio.propTypes = {
  seeking: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  streamUrl: PropTypes.string.isRequired,
  updateTimeOnPlay: PropTypes.func.isRequired,
  playNextSong: PropTypes.func.isRequired,
};

function mapStateToProps(state, { playerTrack }) {
  return {
    playing: isPlayerPlaying(state),
    volume: getCurrentVolume(state),
    mode: getPlayerMode(state),
    streamUrl: getStreamUrl(playerTrack),
    currentTime: getCurrentTime(state),
    seeking: isPlayerSeeking(state),
  };
}

export default connect(mapStateToProps, playerActions)(PlayerAudio);
