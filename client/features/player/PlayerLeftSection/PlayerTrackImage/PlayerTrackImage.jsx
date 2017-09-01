import React from 'react';
import trackFallbackSrc from 'assets/images/default-track.png';
import Image from 'common/components/images/Image';
import Wrapper from './Wrapper';

function PlayerTrackImage(props) {
  return (
    <Wrapper>
      <Image {...props} fallbackSrc={trackFallbackSrc} rounded={false} />
    </Wrapper>
  );
}

export default PlayerTrackImage;
