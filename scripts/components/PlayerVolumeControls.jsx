import React, { PropTypes, Component } from 'react';
// Stateless functional component
class PlayerVolumeControls extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="player-section">
        <div className="player-button player-volume-button" >
          <div className="player-volume-button-wrap">
            <i className="icon ion-android-volume-down" />
            <i className="icon ion-android-volume-mute" />
          </div>
        </div>
        <div className="player-volume">
          <div className="player-seek-bar-wrap">
            <div className="player-seek-bar" ref="volumeBar">
              <div className="player-seek-duration-bar" style={{ width: `50%` }} >
                <div className="player-seek-handle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

PlayerVolumeControls.PropTypes = {

};

export default PlayerVolumeControls;
