import React from 'react';
import PropTypes from 'prop-types';


const ArtistInfo = ({
  avatarUrl,
  artistName,
  followerCount,
  description,
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

ArtistInfo.propTypes = {
  avatarUrl: PropTypes.string,
  artistName: PropTypes.string,
  followerCount: PropTypes.string, // Formatted number
  description: PropTypes.string,
};

export default ArtistInfo;
