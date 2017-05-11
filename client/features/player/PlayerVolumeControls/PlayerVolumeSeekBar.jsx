import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { computeNewVolumeOnSeek } from 'client/features/player/playerUtils';

import {
  beginVolumeSeek,
  changeVolume,
  toggleMute,
  updateVolumeAndEndSeek,
} from 'client/features/player/playerActions';
import { getCurrentVolume, isVolumeSeeking } from 'client/features/player/playerSelectors';

function mapStateToProps(state) {
  return {
    volume: getCurrentVolume(state),
    volumeSeeking: isVolumeSeeking(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onVolumeHandleMouseDown: () => {
      dispatch(beginVolumeSeek());
    },

    onVolumeHandleMouseMove: (volumeBar, e) => {
      const newVolume = computeNewVolumeOnSeek(volumeBar, e);
      dispatch(changeVolume(newVolume));
    },

    onVolumeBarMouseDown: () => {
      dispatch(beginVolumeSeek());
    },

    onToggleMuteClick: () => {
      dispatch(toggleMute());
    },

    onVolumeMouseUp: (volumeBar, e) => {
      const newVolume = computeNewVolumeOnSeek(volumeBar, e);
      dispatch(updateVolumeAndEndSeek(newVolume));
    },
  };
}

const PlayerVolumeWrapper = styled.div`
  margin-left: 7px;
  width: 100px;
`;

class PlayerVolumeSeekBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this);
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevSeeking = prevProps.volumeSeeking;
    const currSeeking = this.props.volumeSeeking;
    if (!prevSeeking && currSeeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleVolumeMouseMove);
      document.addEventListener('mouseup', this.handleVolumeMouseUp);
    } else if (prevSeeking && !currSeeking) {
      // Remove them only when we finish seeking
      document.removeEventListener('mousemove', this.handleVolumeMouseMove);
      document.removeEventListener('mouseup', this.handleVolumeMouseUp);
    }
  }

  handleVolumeMouseMove(e) {
    this.props.onVolumeHandleMouseMove(this.volumeBar, e);
  }

  handleVolumeMouseUp(e) {
    this.props.onVolumeMouseUp(this.volumeBar, e);
  }

  render() {
    const { volume, onVolumeBarMouseDown, onVolumeHandleMouseDown } = this.props;

    return (
      <PlayerVolumeWrapper>
        <div
          className="player-seek-bar-wrap"
          onMouseDown={onVolumeBarMouseDown}
          onMouseUp={this.handleVolumeMouseUp}
        >
          <div
            className="player-seek-bar"
            ref={(ref) => {
              this.volumeBar = ref;
            }}
          >
            <div className="player-seek-duration-bar" style={{ width: `${volume * 100}%` }}>
              <div className="player-seek-handle" onMouseDown={onVolumeHandleMouseDown} />
            </div>
          </div>
        </div>
      </PlayerVolumeWrapper>
    );
  }
}

PlayerVolumeSeekBar.propTypes = {
  volume: PropTypes.number.isRequired,
  volumeSeeking: PropTypes.bool.isRequired,
  onVolumeBarMouseDown: PropTypes.func.isRequired,
  onVolumeHandleMouseDown: PropTypes.func.isRequired,
  onVolumeMouseUp: PropTypes.func.isRequired,
  onVolumeHandleMouseMove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeSeekBar);
