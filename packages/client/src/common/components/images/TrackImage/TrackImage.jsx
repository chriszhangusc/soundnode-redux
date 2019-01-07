import React from 'react';
import defaultTrackSrc from 'assets/images/default-track.png';
import Image from '@soundnode-redux/client/src/common/components/images/Image';

function TrackImage(props) {
  return <Image fallbackSrc={defaultTrackSrc} rounded={false} {...props} />;
}

export default TrackImage;
