import React from 'react';
import PropTypes from 'prop-types';
import LoadingImage from 'client/components/LoadingImage/LoadingImage';

const ArtistInfo = ({
  avatarUrl,
  artistName,
  followerCount,
  description,
}) => (
  <div className="artist-info-container">
    <LoadingImage /> 
    
    <div className="artist-avatar">
      
      <img
        alt="User avatar"
        src={avatarUrl}
        onLoad={() => { console.log('Image loaded'); }}
        onError={() => { console.log('Image failed to load'); }}
      />
    </div>
    <div className="artist-details">
      <h1 className="artist-name">{artistName}</h1>
      <div className="artist-followers">Followers: {followerCount}</div>
      <div className="artist-description">{description}</div>
    </div>
  </div>
);

ArtistInfo.defaultProps = {
  avatarUrl: '',
  artistName: '',
  followerCount: 0,
  description: '',
};

ArtistInfo.propTypes = {
  avatarUrl: PropTypes.string,
  artistName: PropTypes.string,
  followerCount: PropTypes.string, // Formatted number
  description: PropTypes.string,
};

export default ArtistInfo;
