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
    const { onRepeatClick, mode } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Repeat"
          active={mode === REPEAT}
          name="repeat"
          onClick={onRepeatClick}
        />
      </ButtonWrapper>
    );
  };

  renderShuffle = () => {
    const { onShuffleClick, mode } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Shuffle"
          active={mode === SHUFFLE}
          name="random"
          onClick={onShuffleClick}
        />
      </ButtonWrapper>
    );
  };

  renderTogglePlaylist = () => {
    const { onTogglePlayQueueClick, playQueueHidden } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Toggle Play Queue"
          active={!playQueueHidden}
          name="list-ul"
          onClick={onTogglePlayQueueClick}
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
  onRepeatClick: PropTypes.func.isRequired,
  onShuffleClick: PropTypes.func.isRequired,
  onTogglePlayQueueClick: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    mode: getPlayerMode(state),
    playQueueHidden: isPlayQueueHidden(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRepeatClick() {
      dispatch(togglePlayMode(REPEAT));
    },
    onShuffleClick() {
      dispatch(togglePlayMode(SHUFFLE));
    },
    onTogglePlaylistClick() {
      dispatch(togglePlayQueue());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
