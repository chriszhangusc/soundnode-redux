import React, { PropTypes, Component } from 'react';
// Stateless functional component
class PlayerVolumeControls extends Component {
  constructor(props) {
    super(props);
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this);
  }

  handleVolumeMouseMove (e) {
    const {onVolumeHandleMouseMove} = this.props;
    onVolumeHandleMouseMove(this.volumeBar, e);
  }

  componentDidUpdate (prevProps) {
    const {player} = this.props;
    const {onVolumeHandleMouseUp, onVolumeHandleMouseMove} = this.props;
    const prevIsSeeking = prevProps.player.volumeIsSeeking;
    const currIsSeeking = player.volumeIsSeeking;
    if (!prevIsSeeking && currIsSeeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleVolumeMouseMove);
      document.addEventListener('mouseup', onVolumeHandleMouseUp);
    } else if (prevIsSeeking && !currIsSeeking) {
      // Remove them only when we finish seeking
      document.removeEventListener('mousemove', this.handleVolumeMouseMove);
      document.removeEventListener('mouseup', onVolumeHandleMouseUp);
    }

  }

  render () {

    const {onVolumeBarMouseDown, onVolumeHandleMouseDown, onVolumeBarMouseUp} = this.props;
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
          <div className="player-seek-bar-wrap"
            onMouseDown={onVolumeBarMouseDown}
            onMouseUp={onVolumeBarMouseUp.bind(null, this.volumeBar)}
            >
            <div className="player-seek-bar" ref={ref => this.volumeBar = ref}>
              <div className="player-seek-duration-bar" style={{ width: `${volume * 100}%` }} >
                <div className="player-seek-handle" onMouseDown={onVolumeHandleMouseDown}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

PlayerVolumeControls.propTypes = {
};

export default PlayerVolumeControls;
