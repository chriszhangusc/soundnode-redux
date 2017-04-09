import React from 'react';
import PropTypes from 'prop-types';
import { defaultArtistImageUrl } from 'client/constants/ImageConstants';

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
