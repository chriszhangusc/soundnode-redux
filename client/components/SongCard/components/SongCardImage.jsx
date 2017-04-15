import React from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
// import FadeinImage from 'client/components/Images/FadeinImage';
import IconButton from 'client/components/Buttons/IconButton';
import styles from './SongCard.css';

// Animating all images would dramatically slow down our app
// <FadeinImage placeholderClassName="song-card-image" largeImgUrl={artworkUrl} smallImgUrl={artworkUrlSmall} />

function SongCardImage({ active, playing, artworkUrl, artworkUrlSmall, handleImageClick }) {
  return (
    <div
      className={styles.songCardImage}
      style={{ backgroundImage: `url(${artworkUrl})` }}
    >
      <IconButton
        btnClassName={`toggle-play-button ${(active ? 'active' : '')}`}
        iconClassName={`toggle-play-button-icon ${playing ? 'ion-ios-pause' : 'ion-ios-play'}`}
        onClick={handleImageClick}
      />
    </div>

  );
}

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
