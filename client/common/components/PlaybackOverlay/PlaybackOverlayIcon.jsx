import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeColor } from 'app/css/colors';
import Icon from 'common/components/icons/Icon';

const Wrapper = styled.i`
  display: inline-block;
  color: ${themeColor};
`;

function PlaybackOverlayIcon({ playing }) {
  return (
    <Wrapper>
      <Icon name={playing ? 'pause' : 'play'} color={themeColor} iconSize="1.5rem" />
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
