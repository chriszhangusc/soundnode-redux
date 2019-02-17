import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { themeColor } from '@soundnode-redux/client/src/app/css/colors';
import Spinner from '@soundnode-redux/client/src/common/components/spinners/CircleRotate';
import PlayingIndicator from './PlayingIndicator';
import Overlay from './Overlay';

// styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   background-color: ${props => props.theme.colors.themeColor};
//   cursor: pointer;
// `;
const StyledPlayIcon = styled(PlayIcon)`
  color: ${props => props.theme.colors.themeColor};
`;

const StyledPauseIcon = styled(PauseIcon)`
  color: ${props => props.theme.colors.themeColor};
`;

function PlaybackOverlay({ playing, loading, active, onClick }) {
  let icon = null;

  if (loading && active) {
    icon = <Spinner small color={themeColor} />;
  } else if (playing) {
    icon = <PlayingIndicator />;
  } else {
    icon = playing ? <StyledPauseIcon /> : <StyledPlayIcon />;
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
