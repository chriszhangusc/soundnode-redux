import React, { PropTypes } from 'react';

const renderTogglePlayButton = (isPlaying, isActive, handlePauseSong, handleChangeSong) => {

  if (isActive && isPlaying) {
    return (
      <div className={`toggle-play-button ${(isActive ? 'active' : '')}`}
        onClick={ handlePauseSong }>
        <i className="toggle-play-button-icon ion-ios-pause" />
      </div>
    );
  } else {
    return (
      <div className={`toggle-play-button ${(isActive ? 'active' : '')}`}
        onClick={ handleChangeSong }>
        <i className="toggle-play-button-icon ion-ios-play" />
      </div>
    );
  }
};

const SongCard = (props) => {

  const {
    title,
    userImage,
    username,
    isPlaying,
    isActive,
    imageUrl,
    handlePauseSong,
    handleChangeSong
  } = props;

  return (
    <div className={`card song-card ${(isActive ? 'active' : '')}`}>
      <div className="song-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
        {renderTogglePlayButton(isPlaying, isActive, handlePauseSong, handleChangeSong)}
      </div>
      <div className="song-card-user clearfix">
        <img
          className="song-card-user-image"
          src={userImage}
        />
        <div className="song-card-details">
          <a className="song-card-title">
            {title}
          </a>
          <a className="song-card-user-username">
            {username}
          </a>
        </div>
      </div>
    </div>
  );
}

SongCard.propTypes = {
  title: PropTypes.string,
  userImage: PropTypes.string,
  username: PropTypes.string,
  isActive: PropTypes.bool,
  imageUrl: PropTypes.string,
  isPlaying: PropTypes.bool,
  handlePauseSong: PropTypes.func,
  handleChangeSong: PropTypes.func
};

export default SongCard;
