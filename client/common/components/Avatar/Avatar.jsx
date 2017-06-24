import React from 'react';
import PropTypes from 'prop-types';
// import { getNormalVersion } from 'common/utils/imageUtils';
import { defaultArtistImageUrl } from 'common/constants/imageConsts';
import EnhancedImage from 'common/components/images/EnhancedImage';

// Change to fallback image!
const Avatar = ({ src, alt }) => <EnhancedImage alt={alt} src={src} circle />;

Avatar.defaultProps = {
  alt: 'avatar',
  src: defaultArtistImageUrl,
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
