import React, { PropTypes } from 'react';

export default function SongCardInfo({ userImage, title, username, handleImageNotFound }) {
  return (
    <div className="song-card-user clearfix">
      <img
        alt="user-profile-img"
        className="song-card-user-image"
        src={userImage}
      />
      <div className="song-card-details">
        <a className="song-card-title">
          {title}
        </a>
        <a className="song-card-username">
          {username}
        </a>
      </div>
    </div>
  );
}

SongCardInfo.propTypes = {
  userImage: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string,
  handleImageNotFound: PropTypes.func
};
