import React, { PropTypes, Component } from 'react';
import { REPEAT, SHUFFLE } from '../../constants/PlayerConstants';
// Stateless functional component
class PlayerModeControls extends Component {

  constructor(props) {
    super(props);
    this.renderRepeat = this.renderRepeat.bind(this);
    this.renderShuffle = this.renderShuffle.bind(this);
  }

  renderRepeat() {
    const { onRepeatClick, mode } = this.props;
    return (
      <button
        className={`icon-button player-button ${(mode === REPEAT ? 'active' : '')}`}
        onClick={onRepeatClick}
      >
        <i className="icon ion-loop" />
      </button>
    );
  }

  renderShuffle() {
    const { onShuffleClick, mode } = this.props;
    return (
      <button
        className={`icon-button player-button ${(mode === SHUFFLE ? 'active' : '')}`}
        onClick={onShuffleClick}
      >
        <i className="icon ion-shuffle" />
      </button>
    );
  }

  render() {
    return (
      <div className="player-section">
        {this.renderRepeat()}
        {this.renderShuffle()}
      </div>
    );
  }

}

PlayerModeControls.propTypes = {
  mode: PropTypes.string,
  onRepeatClick: PropTypes.func,
  onShuffleClick: PropTypes.func
};

export default PlayerModeControls;
