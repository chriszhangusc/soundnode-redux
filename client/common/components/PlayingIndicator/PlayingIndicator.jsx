import React from 'react';
import Image from 'common/components/images/Image';
import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: ${props => props.theme.zIndexes[5]}
`;

function PlayingIndicator() {
  return (
    <Wrapper>
      <Image
        rounded
        src="https://play-music.gstatic.com/fe/5fe97bf3f03d8f910c21eadc88b3532e/ani_equalizer_white_x2.gif"
        size="tiny"
      />
    </Wrapper>
  );
}

export default PlayingIndicator;
