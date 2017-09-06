import React from 'react';

import Wrapper from './Wrapper';
import TitleColumn from './TitleColumn';
import ClearIcon from './ClearIcon';

function PlayQueueHeader() {
  return (
    <Wrapper>
      <TitleColumn>TRACKS</TitleColumn>
      <TitleColumn>|</TitleColumn>
      <TitleColumn>ARTIST</TitleColumn>
      {/* <ClearIcon /> */}
    </Wrapper>
  );
}

export default PlayQueueHeader;
