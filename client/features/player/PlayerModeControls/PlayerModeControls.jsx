import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT, SHUFFLE } from 'client/features/player/playerConsts';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PlayerButton from '../PlayerButton';

const PlayerModeControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

class PlayerModeControls extends Component {
  constructor(props) {
    super(props);
    this.renderRepeat = this.renderRepeat.bind(this);
    this.renderShuffle = this.renderShuffle.bind(this);
    this.renderTogglePlaylist = this.renderTogglePlaylist.bind(this);
  }

  renderRepeat() {
    const tooltip = <Tooltip id="tooltip-repeat">Repeat</Tooltip>;
    const { onRepeatClick, mode } = this.props;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <PlayerButton
          title="Repeat"
          active={mode === REPEAT}
          iconClassName="ion-loop"
          onClick={onRepeatClick}
        />
      </OverlayTrigger>
    );
  }

  renderTogglePlaylist() {
    const { onTogglePlaylistClick, playlistHidden } = this.props;
    const tooltip = <Tooltip id="tooltip-toggle-playlist">Toggle playlist</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <PlayerButton
          title="Playlist"
          active={!playlistHidden}
          iconClassName="ion-ios-list"
          onClick={onTogglePlaylistClick}
        />
      </OverlayTrigger>
    );
  }

  renderShuffle() {
    const { onShuffleClick, mode } = this.props;
    const tooltip = <Tooltip id="tooltip-shuffle">Shuffle</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <PlayerButton
          title="Shuffle"
          active={mode === SHUFFLE}
          iconClassName="ion-shuffle"
          onClick={onShuffleClick}
        />
      </OverlayTrigger>
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
