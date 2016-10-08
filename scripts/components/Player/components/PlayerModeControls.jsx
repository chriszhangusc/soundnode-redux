import React, { PropTypes, Component } from 'react';
import { REPEAT, SHUFFLE } from 'client/constants/PlayerConstants';
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
      <div className="player-btn-wrapper tooltip">
        <span className="tooltiptext">Repeat</span>
        <button
          className={`icon-btn ${(mode === REPEAT ? 'active' : '')}`}
          onClick={onRepeatClick}
        >
          <i className="icon ion-loop" />
        </button>
      </div>
    );
  }

  renderShuffle() {
    const { onShuffleClick, mode } = this.props;
    return (
      <div className="player-btn-wrapper tooltip">
        <span className="tooltiptext">Shuffle</span>
        <button
          className={`icon-btn ${(mode === SHUFFLE ? 'active' : '')}`}
          onClick={onShuffleClick}
        >
          <i className="icon ion-shuffle" />
        </button>
      </div>
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
