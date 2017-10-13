import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import { themeColor } from 'app/css/colors';
import Spinner from 'common/components/spinners/CircleRotate';
import PlayingIndicator from './PlayingIndicator';
import Overlay from './Overlay';

function PlaybackOverlay({ playing, loading, active, onClick }) {
  let icon = null;

  if (loading && active) {
    icon = <Spinner small color={themeColor} />;
  } else if (playing) {
    icon = <PlayingIndicator />;
  } else {
    icon = <Icon iconName={playing ? 'pause' : 'play'} color={themeColor} iconSize="lg" />;
  }

  return (
    <Overlay active={active} onClick={onClick}>
      {icon}
    </Overlay>
  );
}

PlaybackOverlay.propTypes = {
  playing: PropTypes.bool,
  loading: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

PlaybackOverlay.defaultProps = {
  playing: false,
  loading: false,
  active: false,
  onClick: null,
};

export default PlaybackOverlay;
