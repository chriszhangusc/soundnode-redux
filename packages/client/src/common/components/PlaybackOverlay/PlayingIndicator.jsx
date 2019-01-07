import React from 'react';
import Image from '@soundnode-redux/client/src/common/components/images/Image';

function PlayingIndicator() {
  return (
    <Image
      rounded
      src="https://play-music.gstatic.com/fe/5fe97bf3f03d8f910c21eadc88b3532e/ani_equalizer_white_x2.gif"
      size="tiny"
    />
  );
}

export default PlayingIndicator;
