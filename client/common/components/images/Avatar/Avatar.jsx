import React from 'react';
import PropTypes from 'prop-types';
import { defaultArtistImageUrl } from 'common/constants/imageConsts';
import Image from 'common/components/images/Image';

// Size tiny small medium large
function getWidthAndHeight(size) {
  switch (size) {
    case 'small':
      return 25;
    case 'medium':
      return 150;
    case 'large':
      return 350;
    default:
      return 25;
  }
}

// Change to fallback image!
function Avatar(props) {
  const { size, width, height, ...rest } = props;
  if (size) {
    const n = getWidthAndHeight(size);
    return <Image width={n} height={n} {...rest} rounded />;
  }
  return <Image width={width} height={height} {...rest} rounded />;
}

Avatar.defaultProps = {
  size: 'small',
  linkTo: undefined,
  alt: 'avatar',
  src: defaultArtistImageUrl,
};

Avatar.propTypes = {
  linkTo: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
