import React from 'react';
import PropTypes from 'prop-types';
// import { getNormalVersion } from 'client/common/utils/imageUtils';
import { defaultArtistImageUrl } from 'client/common/constants/imageConsts';
import EnhancedImage from 'client/common/components/images/EnhancedImage';

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
