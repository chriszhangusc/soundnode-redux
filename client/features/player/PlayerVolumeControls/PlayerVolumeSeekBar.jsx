import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WHITE, THEME_COLOR } from 'app/css/colors';
import { computeNewVolumeOnSeek } from 'features/player/playerUtils';

import {
  beginVolumeSeek,
  changeVolume,
  toggleMute,
  updateVolumeAndEndSeek,
} from 'features/player/playerActions';
import { getCurrentVolume, isVolumeSeeking } from 'features/player/playerSelectors';

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

const PlayerSeekbar = styled.div`
    position: relative;
    height: 2px;
    background-color: #ddd;
`;

const PlayerSeekbarWrapper = styled.div`
  padding: 6px 0;
  flex: 1;
  cursor: pointer;
`;

const PlayerSeekDurationBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width || '100%'};
  height: 100%;
  background-color: ${THEME_COLOR};
`;

const PlayerSeekHandle = styled.div`
    position: absolute;
    top: -5px;
    right: -6px;
    width: 12px;
    height: 12px;
    background-color: ${WHITE};
    border-radius: 50%;
    border: 1px solid ${WHITE};
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
        <PlayerSeekbarWrapper
          onMouseDown={onVolumeBarMouseDown}
          onMouseUp={this.handleVolumeMouseUp}
        >
          <PlayerSeekbar
            innerRef={(ref) => {
              this.volumeBar = ref;
            }}
          >
            <PlayerSeekDurationBar width={`${volume * 100}%`}>
              <PlayerSeekHandle onMouseDown={onVolumeHandleMouseDown} />
            </PlayerSeekDurationBar>
          </PlayerSeekbar>
        </PlayerSeekbarWrapper>
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
