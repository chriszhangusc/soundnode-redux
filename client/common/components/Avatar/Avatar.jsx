import React from 'react';
import PropTypes from 'prop-types';
import { defaultArtistImageUrl } from 'common/constants/imageConsts';
import EnhancedImage from 'common/components/images/EnhancedImage';
import { Link } from 'react-router-dom';

// Change to fallback image!
function Avatar({ linkTo, src, alt, ...rest }) {
  const avatarImage = <EnhancedImage alt={alt} src={src} {...rest} circle />;
  return linkTo ? <Link to={linkTo}>{avatarImage}</Link> : avatarImage;
}

Avatar.defaultProps = {
  linkTo: undefined,
  alt: 'avatar',
  src: defaultArtistImageUrl,
};

Avatar.propTypes = {
  linkTo: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
