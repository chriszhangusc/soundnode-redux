import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import { themeColor } from 'app/css/colors';

import Wrapper from './Wrapper';

function PlaybackOverlayIcon({ playing }) {
  return (
    <Wrapper>
      <Icon iconName={playing ? 'pause' : 'play'} color={themeColor} iconSize="1.5rem" />
    </Wrapper>
  );
}

PlaybackOverlayIcon.defaultProps = {
  playing: false,
};

PlaybackOverlayIcon.propTypes = {
  playing: PropTypes.bool,
};

export default PlaybackOverlayIcon;
