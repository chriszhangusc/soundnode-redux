import React, { PropTypes, Component } from 'react';
// Stateless functional component
class PlayerModeControls extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="player-section">
        <div className={`player-button active tooltip`}>
          <span className="tooltiptext">Single Repeat</span>
          <i className="icon ion-loop" />
        </div>

        <div className={`player-button } tooltip`}>
          <span className="tooltiptext">Shuffle</span>
          <i className="icon ion-shuffle" />
        </div>
      </div>
    );
  }

}

PlayerModeControls.PropTypes = {

};

export default PlayerModeControls;
