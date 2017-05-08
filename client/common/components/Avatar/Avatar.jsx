import React from 'react';
import PropTypes from 'prop-types';
import { defaultArtistImageUrl } from 'client/common/constants/ImageConsts';

// Change to fallback image!
const Avatar = ({ src, alt }) => (
  <img
    alt={alt}
    className="avatar"
    src={src || defaultArtistImageUrl}
  />
);

Avatar.defaultProps = {
  alt: 'avatar',
  src: defaultArtistImageUrl,
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
