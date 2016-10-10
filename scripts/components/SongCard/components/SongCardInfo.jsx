import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function SongCardInfo({ trackId, uid, userImage, title, username }) {
  return (
    <div className="song-card-user clearfix">
      <img
        alt="user-profile-img"
        className="song-card-user-image"
        src={userImage}
      />
      <div className="song-card-details">
        <Link to={`/track/${trackId}`} className="song-card-title">
          {title}
        </Link>
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
