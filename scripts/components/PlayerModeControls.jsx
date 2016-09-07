import React, { PropTypes, Component } from 'react';
import {REPEAT, SHUFFLE} from '../constants/PlayerConstants';
// Stateless functional component
class PlayerModeControls extends Component {

  constructor(props) {
    super(props);
    this.renderRepeat = this.renderRepeat.bind(this);
    this.renderShuffle = this.renderShuffle.bind(this);
  }

  renderRepeat() {
    const {onRepeatClick} = this.props;
    const mode = this.props.player.mode;
    return (
      <div className={`player-button tooltip ${(mode === REPEAT ? 'active' : '')}`}>
        <span className="tooltiptext">Repeat</span>
        <i className="icon ion-loop" onClick={onRepeatClick} />
      </div>
    );
  }

  renderShuffle() {
    const {onShuffleClick} = this.props;
    const mode = this.props.player.mode;
    return (
      <div className={`player-button tooltip ${(mode === SHUFFLE ? 'active' : '')}`}>
        <span className="tooltiptext">Shuffle</span>
        <i className="icon ion-shuffle" onClick={onShuffleClick} />
      </div>
    );
  }

  render () {
    return (
      <div className="player-section">
        {this.renderRepeat()}
        {this.renderShuffle()}
      </div>
    );
  }

}

PlayerModeControls.PropTypes = {

};

export default PlayerModeControls;
