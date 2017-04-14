import React from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
// import FadeInImage from 'client/components/Images/FadeInImage';
import MagicButton from 'client/components/MagicButton';


  // <ProgressiveImage largeImgUrl={artworkUrl} smallImgUrl={artworkUrlSmall} placeholderClassName="song-card-image" />

const SongCardImage = ({ active, playing, artworkUrl, artworkUrlSmall, handleImageClick }) => (
  <div
    className="song-card-image"
    style={{ backgroundImage: `url(${artworkUrl})` }}
  >
    <MagicButton
      btnClassName={`toggle-play-button ${(active ? 'active' : '')}`}
      iconClassName={`toggle-play-button-icon ${playing ? 'ion-ios-pause' : 'ion-ios-play'}`}
      onClick={handleImageClick}
    />
  </div>
);

SongCardImage.defaultProps = {
  active: false,
  playing: false,
  artworkUrl: '',
  artworkUrlSmall: '',
  handleImageClick: defaultEventHandlerFactory('handleImageClick'),
};

SongCardImage.propTypes = {
  active: PropTypes.bool,
  playing: PropTypes.bool,
  artworkUrl: PropTypes.string,
  artworkUrlSmall: PropTypes.string,
  handleImageClick: PropTypes.func,
};

export default SongCardImage;
