import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT, SHUFFLE } from 'client/features/player/consts';
import { defaultEventHandlerFactory } from 'client/common/utils/FactoryUtils';
import IconButton from 'client/common/components/Buttons/IconButton';
// Stateless functional component
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
        btnClassName={`icon-button player-button ${(mode === REPEAT ? 'active' : '')}`}
        iconClassName="icon ion-loop"
        onClick={onRepeatClick}
      />
    );
  }

  renderTogglePlaylist() {
    const { onTogglePlaylistClick, playlistHidden } = this.props;
    return (
      <IconButton
        title="Playlist"
        btnClassName={`icon-button player-button ${(playlistHidden ? '' : 'active')}`}
        iconClassName="icon ion-ios-list"
        onClick={onTogglePlaylistClick}
      />
    );
  }

  renderShuffle() {
    const { onShuffleClick, mode } = this.props;
    return (
      <IconButton
        title="Shuffle"
        btnClassName={`icon-button player-button ${(mode === SHUFFLE ? 'active' : '')}`}
        iconClassName="icon ion-shuffle"
        onClick={onShuffleClick}
      />
    );
  }

  render() {
    return (
      <div className="player-section">
        {this.renderRepeat()}
        {this.renderShuffle()}
        {this.renderTogglePlaylist()}
      </div>
    );
  }

}

PlayerModeControls.defaultProps = {
  mode: 'LOOP',
  playlistHidden: true,
  onRepeatClick: defaultEventHandlerFactory('onRepeatClick'),
  onShuffleClick: defaultEventHandlerFactory('onShuffleClick'),
  onTogglePlaylistClick: defaultEventHandlerFactory('onTogglePlaylistClick'),
};

PlayerModeControls.propTypes = {
  mode: PropTypes.string,
  playlistHidden: PropTypes.bool,
  onRepeatClick: PropTypes.func,
  onShuffleClick: PropTypes.func,
  onTogglePlaylistClick: PropTypes.func,
};

export default PlayerModeControls;
