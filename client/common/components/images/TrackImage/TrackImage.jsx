import React from 'react';
import PropTypes from 'prop-types';
import defaultTrackSrc from 'assets/images/default-track.png';
import Image from 'common/components/images/Image';

function TrackImage(props) {
  const { size, ...rest } = props;
  return <Image fallbackSrc={defaultTrackSrc} size={size} rounded={false} {...rest} />;
}

TrackImage.defaultProps = {
  size: 'small',
};

TrackImage.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'fluid']),
};

export default TrackImage;
