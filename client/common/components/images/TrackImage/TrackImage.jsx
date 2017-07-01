import React from 'react';
import PropTypes from 'prop-types';
import defaultTrackImage from 'assets/images/default-track.png';
import Image from 'common/components/images/Image';

// Size tiny small medium large
function getWidthAndHeight(size) {
  switch (size) {
    case 'small':
      return 25;
    case 'medium':
      return 206;
    case 'large':
      return 350;
    default:
      return 25;
  }
}

// Change to fallback image!
function TrackImage(props) {
  const { size, width, height, ...rest } = props;
  if (size) {
    const n = getWidthAndHeight(size);
    return <Image fallbackSrc={defaultTrackImage} width={n} height={n} {...rest} />;
  }
  return <Image fallbackSrc={defaultTrackImage} width={width} height={height} {...rest} />;
}

TrackImage.defaultProps = {
  size: 'small',
  linkTo: undefined,
  alt: 'avatar',
  src: defaultTrackImage,
  width: undefined,
  height: undefined,
};

TrackImage.propTypes = {
  linkTo: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default TrackImage;
