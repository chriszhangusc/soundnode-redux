import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT, SHUFFLE } from 'features/player/playerConsts';
import { connect } from 'react-redux';
import { getPlayerMode } from 'features/player/playerSelectors';
import { togglePlayMode } from 'features/player/playerActions';
import { isPlayQueueHidden } from 'features/playQueue/playQueueSelectors';
import { togglePlayQueue } from 'features/playQueue/playQueueActions';
import PlayerButton from 'features/player/shared/PlayerButton';
import Wrapper from './Wrapper';
import ButtonWrapper from './ButtonWrapper';

class PlayerModeControls extends Component {
  renderRepeat = () => {
    const { handleRepeatClick, mode } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Repeat"
          active={mode === REPEAT}
          name="repeat"
          onClick={handleRepeatClick}
        />
      </ButtonWrapper>
    );
  };

  renderShuffle = () => {
    const { handleShuffleClick, mode } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Shuffle"
          active={mode === SHUFFLE}
          name="random"
          onClick={handleShuffleClick}
        />
      </ButtonWrapper>
    );
  };

  renderTogglePlaylist = () => {
    const { handlePlayQueueToggle, playQueueHidden } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Toggle Play Queue"
          active={!playQueueHidden}
          name="list-ul"
          onClick={handlePlayQueueToggle}
        />
      </ButtonWrapper>
    );
  };

  render() {
    return (
      <Wrapper>
        {this.renderRepeat()}
        {this.renderShuffle()}
        {this.renderTogglePlaylist()}
      </Wrapper>
    );
  }
}

PlayerModeControls.propTypes = {
  mode: PropTypes.string.isRequired,
  playQueueHidden: PropTypes.bool.isRequired,
  handleRepeatClick: PropTypes.func.isRequired,
  handleShuffleClick: PropTypes.func.isRequired,
  handlePlayQueueToggle: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    mode: getPlayerMode(state),
    playQueueHidden: isPlayQueueHidden(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleRepeatClick() {
      dispatch(togglePlayMode(REPEAT));
    },
    handleShuffleClick() {
      dispatch(togglePlayMode(SHUFFLE));
    },
    handlePlayQueueToggle() {
      dispatch(togglePlayQueue());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
