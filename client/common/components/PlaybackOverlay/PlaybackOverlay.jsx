import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import { themeColor } from 'app/css/colors';
import Overlay from './Overlay';

function PlaybackOverlay({ playing, active, onClick }) {
  return (
    <Overlay active={active} onClick={onClick}>
      <Icon iconName={playing ? 'pause' : 'play'} color={themeColor} iconSize="lg" />
    </Overlay>
  );
}

PlaybackOverlay.propTypes = {
  playing: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

PlaybackOverlay.defaultProps = {
  playing: false,
  active: false,
  onClick: null,
};

export default PlaybackOverlay;
