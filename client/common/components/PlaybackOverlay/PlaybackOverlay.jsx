import React from 'react';
import PropTypes from 'prop-types';
import ShadowOverlay from './ShadowOverlay';
import PlaybackOverlayIcon from './PlaybackOverlayIcon';

function PlaybackOverlay({ playing, active, onClick }) {
  return (
    <ShadowOverlay active={active} onClick={onClick}>
      <PlaybackOverlayIcon playing={playing} />
    </ShadowOverlay>
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
