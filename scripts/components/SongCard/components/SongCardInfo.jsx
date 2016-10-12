import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function SongCardInfo({ trackId, artistId, artistAvatar, title, artistName }) {
  return (
    <div className="song-card-user clearfix">
      <img
        alt="user-profile-img"
        className="song-card-user-image"
        src={artistAvatar}
      />
      <div className="song-card-details">
        <Link to={`/track/${trackId}`} className="song-card-title">
          {title}
        </Link>
        <Link to={`/artist/${artistId}`} className="song-card-username">
          {artistName}
        </Link>
      </div>
    </div>
  );
}

SongCardInfo.propTypes = {
  trackId: PropTypes.number,
  artistId: PropTypes.number,
  artistAvatar: PropTypes.string,
  title: PropTypes.string,
  artistName: PropTypes.string
};
