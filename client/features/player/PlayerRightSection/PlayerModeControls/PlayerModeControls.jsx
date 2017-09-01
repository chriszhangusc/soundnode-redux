import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT, SHUFFLE } from 'features/player/playerConsts';
import { connect } from 'react-redux';
import { getPlayerMode } from 'features/player/playerSelectors';
import { togglePlayMode } from 'features/player/playerActions';
import { isPlaylistHidden } from 'features/playlist/playlistSelectors';
import { togglePlaylist } from 'features/playlist/playlistActions';
import PlayerButton from 'features/player/shared/PlayerButton';
import Wrapper from './Wrapper';
import ButtonWrapper from './ButtonWrapper';

class PlayerModeControls extends Component {
  constructor(props) {
    super(props);
    this.renderRepeat = this.renderRepeat.bind(this);
    this.renderShuffle = this.renderShuffle.bind(this);
    this.renderTogglePlaylist = this.renderTogglePlaylist.bind(this);
  }

  renderRepeat() {
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
  }

  renderShuffle() {
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
  }

  renderTogglePlaylist() {
    const { onTogglePlaylistClick, playlistHidden } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Toggle playlist"
          active={!playlistHidden}
          name="list-ul"
          onClick={onTogglePlaylistClick}
        />
      </ButtonWrapper>
    );
  }

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
  playlistHidden: PropTypes.bool.isRequired,
  onRepeatClick: PropTypes.func.isRequired,
  onShuffleClick: PropTypes.func.isRequired,
  onTogglePlaylistClick: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    mode: getPlayerMode(state),
    playlistHidden: isPlaylistHidden(state),
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
      dispatch(togglePlaylist());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
