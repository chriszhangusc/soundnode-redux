import React, { PropTypes } from 'react';
import MagicButton from 'client/components/MagicButton';

class SongCardImage extends React.Component {

  constructor(props) {
    super(props);
    this.handleImageClick = props.handleImageClick.bind(this);
  }

  render() {
    const { active, playing, artworkUrl, handleImageClick } = this.props;
    return (
      <div
        className="song-card-image"
        style={{ backgroundImage: `url(${ artworkUrl })` }}
      >
        <MagicButton
          btnClassName={`toggle-play-button ${(active ? 'active' : '')}`}
          iconClassName={`toggle-play-button-icon ${playing ? 'ion-ios-pause' : 'ion-ios-play'}`}
          onClick={handleImageClick}
        />
      </div>
    );
  }
}

SongCardImage.propTypes = {
  active: PropTypes.bool,
  playing: PropTypes.bool,
  artworkUrl: PropTypes.string,
  handleImageClick: PropTypes.func,
};

export default SongCardImage;
