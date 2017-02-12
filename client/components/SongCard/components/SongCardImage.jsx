import React, { PropTypes } from 'react';
import MagicButton from 'client/components/MagicButton';
import { defaultArtworkImageUrl } from 'client/constants/ImageConstants';

class SongCardImage extends React.Component {

  constructor(props) {
    super(props);
    this.handleImageClick = props.handleImageClick.bind(this);
  }

  componentDidMount() {
    console.log('Mounted');
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

// ({
//   active,
//   artworkUrl,
//   playing,
//   handleImageClick,
// }) {
// // console.log('Render: SongCardImage');
//

SongCardImage.propTypes = {

};


export default SongCardImage;
