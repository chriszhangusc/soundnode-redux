import React from 'react';
import styled from 'styled-components';
import trackFallbackSrc from 'assets/images/default-track.png';
import Image from 'common/components/images/Image';

const Wrapper = styled.div`
  height: 90px;
  width: 90px;
  margin-right: 10px;
`;

function PlayerTrackImage(props) {
  return <Wrapper><Image {...props} fallbackSrc={trackFallbackSrc} rounded={false} /></Wrapper>;
}

export default PlayerTrackImage;
