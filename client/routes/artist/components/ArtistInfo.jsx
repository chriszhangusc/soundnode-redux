import React from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'client/components/ProgressiveImage';

const ArtistInfo = ({
  avatarUrl,
  avatarUrlSmall,
  artistName,
  followerCount,
  description,
}) => (
  <div className="artist-info-container">
    <ProgressiveImage
      largeImgUrl={avatarUrl}
      smallImgUrl={avatarUrlSmall}
      placeholderClassName="artist-avatar"
    />
    <div className="artist-details">
      <h1 className="artist-name">{artistName}</h1>
      <div className="artist-followers">Followers: {followerCount}</div>
      <div className="artist-description">{description}</div>
    </div>
  </div>
);

ArtistInfo.defaultProps = {
  avatarUrl: '',
  avatarUrlSmall: '',
  artistName: '',
  followerCount: 0,
  description: '',
};

ArtistInfo.propTypes = {
  avatarUrlSmall: PropTypes.string,
  avatarUrl: PropTypes.string,
  artistName: PropTypes.string,
  followerCount: PropTypes.string, // Formatted number
  description: PropTypes.string,
};

export default ArtistInfo;
