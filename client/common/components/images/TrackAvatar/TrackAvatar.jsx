import React from 'react';
import PropTypes from 'prop-types';
import defaultTrack from 'assets/images/default-track.png';
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
function TrackAvatar(props) {
  const { src, size, width, height, fallbackSrc, rounded, ...rest } = props;
  if (size) {
    const n = getWidthAndHeight(size);
    return (
      <Image
        src={src || defaultTrack}
        fallbackSrc={fallbackSrc || defaultTrack}
        width={n}
        height={n}
        {...rest}
        rounded={rounded}
      />
    );
  }
  return (
    <Image
      src={src || defaultTrack}
      fallbackSrc={fallbackSrc || defaultTrack}
      width={width}
      height={height}
      {...rest}
      rounded={false}
    />
  );
}

// Avatar.defaultProps = {
//   size: 'small',
//   linkTo: undefined,
//   alt: 'avatar',
//   src: defaultAvatar,
//   width: undefined,
//   height: undefined,
//   fallbackSrc: defaultAvatar,
// };

// Avatar.propTypes = {
//   linkTo: PropTypes.string,
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   src: PropTypes.string,
//   alt: PropTypes.string,
//   fallbackSrc: PropTypes.string,
// };

export default TrackAvatar;
