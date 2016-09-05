import React, { PropTypes, Component } from 'react';
// Stateless functional component
class PlayerModeControls extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="player-section">
        <div className={`player-button ${(false ? ' active' : '')}`}>
          <i className="icon ion-loop" />
        </div>

        <div className={`player-button ${(true ? ' active' : '')}`}>
          <i className="icon ion-shuffle" />
        </div>
      </div>
    );
  }

}

PlayerModeControls.PropTypes = {

};

export default PlayerModeControls;
