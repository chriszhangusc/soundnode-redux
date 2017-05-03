import React from 'react';
import PropTypes from 'prop-types';
import styles from './SongCard.css';

// Animating all images would dramatically slow down our app
// <FadeinImage placeholderClassName="song-card-image" largeImgUrl={artworkUrl} smallImgUrl={artworkUrlSmall} />

function SongCardImage({ active, playing, artworkUrl, artworkUrlSmall, handleImageClick }) {
  return (
    <div className={styles.songCardImage} style={{ backgroundImage: `url(${artworkUrl})` }}>
      <button
        className={active ? styles.togglePlayButtonActive : styles.togglePlayButton}
        onClick={handleImageClick}
      >
        <i
          className={`${styles.togglePlayButtonIcon} ${playing ? 'ion-ios-pause' : 'ion-ios-play'}`}
        />
      </button>
    </div>
  );
}

SongCardImage.defaultProps = {
  // Default url?
  artworkUrl: '',
  artworkUrlSmall: '',
  // handleImageClick: defaultEventHandlerFactory('handleImageClick'),
};

SongCardImage.propTypes = {
  active: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  artworkUrl: PropTypes.string,
  artworkUrlSmall: PropTypes.string,
  handleImageClick: PropTypes.func.isRequired,
};

export default SongCardImage;
