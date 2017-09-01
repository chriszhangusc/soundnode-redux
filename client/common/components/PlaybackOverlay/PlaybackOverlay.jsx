import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';
import PlaybackOverlayIcon from './PlaybackOverlayIcon';

function PlaybackOverlay({ playing, active, onClick }) {
  return (
    <Overlay active={active} onClick={onClick}>
      <PlaybackOverlayIcon playing={playing} />
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
