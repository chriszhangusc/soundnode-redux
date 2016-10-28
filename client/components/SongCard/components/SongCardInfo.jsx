import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defaultArtist from 'assets/images/default-artist.png';

export default function SongCardInfo({ trackId, artistId, artistAvatar, title, artistName }) {
// console.log('Render: SongCardInfo');
  return (
    <div className="song-card-user clearfix">
      <img
        alt="user-profile-img"
        className="song-card-user-image"
        src={artistAvatar || defaultArtist}
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
  artistName: PropTypes.string,
};
