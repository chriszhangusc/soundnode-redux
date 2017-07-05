import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from 'assets/images/default-avatar.png';
import defaultTrackAvatar from 'assets/images/default-track.png';
import Image from 'common/components/images/Image';

// Size tiny small medium large
function getWidthAndHeight(size) {
  switch (size) {
    case 'small':
      return 32;
    case 'medium':
      return 70;
    case 'large':
      return 206;
    default:
      return 32;
  }
}

// Change to fallback image!
function Avatar(props) {
  const { src, size, width, height, fallbackSrc, rounded, type, ...rest } = props;
  if (size) {
    const n = getWidthAndHeight(size);
    const userAvatar = type === 'user';
    return (
      <Image
        src={src || defaultAvatar}
        fallbackSrc={fallbackSrc || (userAvatar ? defaultAvatar : defaultTrackAvatar)}
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
  type: 'user',
};

Avatar.propTypes = {
  linkTo: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['user', 'playlist', 'track']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  alt: PropTypes.string,
  fallbackSrc: PropTypes.string,
  rounded: PropTypes.bool,
};

export default Avatar;
