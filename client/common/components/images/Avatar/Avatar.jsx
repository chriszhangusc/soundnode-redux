import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from 'assets/images/default-avatar.png';
import Image from 'common/components/images/Image';

// Size tiny small medium large
function getWidthAndHeight(size) {
  switch (size) {
    case 'small':
      return 32;
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
  const { src, size, width, height, fallbackSrc, rounded, ...rest } = props;
  if (size) {
    const n = getWidthAndHeight(size);
    return (
      <Image
        src={src || defaultAvatar}
        fallbackSrc={fallbackSrc || defaultAvatar}
        width={n}
        height={n}
        {...rest}
        rounded={rounded}
      />
    );
  }
  return (
    <Image
      src={src || defaultAvatar}
      fallbackSrc={fallbackSrc || defaultAvatar}
      width={width}
      height={height}
      {...rest}
      rounded={rounded}
    />
  );
}

Avatar.defaultProps = {
  size: 'small',
  linkTo: undefined,
  alt: 'avatar',
  src: defaultAvatar,
  width: undefined,
  height: undefined,
  fallbackSrc: defaultAvatar,
  rounded: true,
};

Avatar.propTypes = {
  linkTo: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  alt: PropTypes.string,
  fallbackSrc: PropTypes.string,
  rounded: PropTypes.bool,
};

export default Avatar;
