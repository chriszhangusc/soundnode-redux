import React, { PropTypes, Component } from 'react';
import { REPEAT, SHUFFLE } from 'client/redux/modules/player';
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
      <button
        title="Repeat"
        className={`icon-button player-button ${(mode === REPEAT ? 'active' : '')}`}
        onClick={onRepeatClick}
      >
        <i className="icon ion-loop" />
      </button>
    );
  }

  renderTogglePlaylist() {
    const { onTogglePlaylistClick, playlistHidden } = this.props;
    return (
      <button
        title="Playlist"
        className={`icon-button player-button ${(playlistHidden ? '' : 'active')}`}
        onClick={onTogglePlaylistClick}
      >
        <i className="icon ion-ios-list" />
      </button>
    );
  }

  renderShuffle() {
    const { onShuffleClick, mode } = this.props;
    return (
      <button
        title="Shuffle"
        className={`icon-button player-button ${(mode === SHUFFLE ? 'active' : '')}`}
        onClick={onShuffleClick}
      >
        <i className="icon ion-shuffle" />
      </button>
    );
  }

  render() {
  console.log('Render: PlayerModeControls');
    return (
      <div className="player-section">
        {this.renderRepeat()}
        {this.renderShuffle()}
        {this.renderTogglePlaylist()}
      </div>
    );
  }

}

PlayerModeControls.propTypes = {
  mode: PropTypes.string,
  playlistHidden: PropTypes.bool,
  onRepeatClick: PropTypes.func,
  onShuffleClick: PropTypes.func,
  onTogglePlaylistClick: PropTypes.func
};

export default PlayerModeControls;
