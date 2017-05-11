import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT, SHUFFLE } from 'client/features/player/playerConsts';
import IconButton from 'client/common/components/Buttons/IconButton';
import styled from 'styled-components';

const PlayerModeControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

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
      <IconButton
        title="Repeat"
        btnClassName={` player-button ${(mode === REPEAT ? 'active' : '')}`}
        iconClassName="ion-loop"
        onClick={onRepeatClick}
      />
    );
  }

  renderTogglePlaylist() {
    const { onTogglePlaylistClick, playlistHidden } = this.props;
    return (
      <IconButton
        title="Playlist"
        btnClassName={` player-button ${(playlistHidden ? '' : 'active')}`}
        iconClassName="ion-ios-list"
        onClick={onTogglePlaylistClick}
      />
    );
  }

  renderShuffle() {
    const { onShuffleClick, mode } = this.props;
    return (
      <IconButton
        title="Shuffle"
        btnClassName={` player-button ${(mode === SHUFFLE ? 'active' : '')}`}
        iconClassName="ion-shuffle"
        onClick={onShuffleClick}
      />
    );
  }

  render() {
    return (
      <PlayerModeControlsWrapper>
        {this.renderRepeat()}
        {this.renderShuffle()}
        {this.renderTogglePlaylist()}
      </PlayerModeControlsWrapper>
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

export default PlayerModeControls;
