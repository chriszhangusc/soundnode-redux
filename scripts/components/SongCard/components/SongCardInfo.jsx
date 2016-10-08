import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function SongCardInfo({ uid, userImage, title, username }) {
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
        <Link to={`/artist/${uid}`} className="song-card-username">
          {username}
        </Link>
      </div>
    </div>
  );
}

SongCardInfo.propTypes = {
  uid: PropTypes.number,
  userImage: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string
};
