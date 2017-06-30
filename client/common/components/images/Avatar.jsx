import React from 'react';
import PropTypes from 'prop-types';
import { defaultArtistImageUrl } from 'common/constants/imageConsts';
// import EnhancedImage from 'common/components/images/EnhancedImage';
import Image from 'common/components/images/Image';

// Size tiny small medium large

// Change to fallback image!
function Avatar(props) {
  // const avatarImage = <EnhancedImage alt={alt} src={src} {...rest} circle />;
  return <Image {...props} width="25" height="25" rounded />;
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
