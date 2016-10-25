import React, { PropTypes } from 'react';

const ArtistInfo = ({
  avatarUrl,
  artistName,
  followerCount,
  description
}) => (
  <div className="artist-info-container">
    <div className="artist-avatar">
      <img alt="User avatar" src={avatarUrl} />
    </div>
    <div className="artist-details">
      <h1 className="artist-name">{artistName}</h1>
      <div className="artist-followers">Followers: {followerCount}</div>
      <div className="artist-description">{description}</div>
    </div>
  </div>

);

// formatImageUrl(artist.getAvatarUrl(), t500x500)

ArtistInfo.propTypes = {
  avatarUrl: PropTypes.string,
  artistName: PropTypes.string,
  followerCount: PropTypes.string, //formatted number
  description: PropTypes.string
};

export default ArtistInfo;
