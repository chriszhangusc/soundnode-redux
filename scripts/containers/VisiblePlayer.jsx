import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentSongId } from '../selectors/playerSelectors';
import PlayerAudioContainer from './PlayerAudioContainer';
import VisiblePlayerSongInfo from './VisiblePlayerSongInfo';
import VisiblePlayerControls from './VisiblePlayerControls';
import VisiblePlayerDurationBar from './VisiblePlayerDurationBar';
import VisiblePlayerModeControls from './VisiblePlayerModeControls';
import VisiblePlayerVolumeControls from './VisiblePlayerVolumeControls';

class VisiblePlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Extract props that we care, and pass the other props as others.
    const { currentSongId } = this.props;
    if (!currentSongId) {
      return null;
    } else {
      console.log(currentSongId);
      return (
          <div className="player">
            <div className="container">
              <div className="player-main">
                <PlayerAudioContainer />
                <VisiblePlayerSongInfo />
                <VisiblePlayerControls />
                <VisiblePlayerDurationBar />
                <VisiblePlayerModeControls />
                <VisiblePlayerVolumeControls />
              </div>
            </div>
          </div>
      );
    }
  }

}

const mapStateToProps = (state) => ({
  currentSongId: getCurrentSongId(state)
})

VisiblePlayer.propTypes = {
  currentSongId: PropTypes.number
};

export default connect(mapStateToProps)(VisiblePlayer);
