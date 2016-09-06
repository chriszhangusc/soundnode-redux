import React, { PropTypes, Component } from 'react';
// Stateless functional component
class PlayerVolumeControls extends Component {
  constructor(props) {
    super(props);
    this.handleVolumeBarClick = this.handleVolumeBarClick.bind(this);
  }

  handleVolumeBarClick (e) {
    const {onVolumeBarClick} = this.props;
    onVolumeBarClick(e, this.volumeBar);
  }

  render () {

    const {onVolumeBarClick} = this.props;
    const {volume} = this.props;
    return (
      <div className="player-section">
        <div className="player-button player-volume-button" >
          <div className="player-volume-button-wrap">
            <i className="icon ion-android-volume-down" />
            <i className="icon ion-android-volume-mute" />
          </div>
        </div>
        <div className="player-volume">
          <div className="player-seek-bar-wrap" onClick={this.handleVolumeBarClick}>
            <div className="player-seek-bar" ref={ref => this.volumeBar = ref}>
              <div className="player-seek-duration-bar" style={{ width: `${volume * 100}%` }} >
                <div className="player-seek-handle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

PlayerVolumeControls.propTypes = {
  onVolumeBarClick: PropTypes.func.isRequired,
  // onVolumeHandleMouseDown: PropTypes.func.isRequired,

};

export default PlayerVolumeControls;
