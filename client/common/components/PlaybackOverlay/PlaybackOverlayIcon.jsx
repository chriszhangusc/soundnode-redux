import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { THEME_COLOR } from 'app/css/colors';
import Icon from 'common/components/icons/Icon';

const Wrapper = styled.i`
  display: inline-block;
  color: ${THEME_COLOR};
`;

function PlaybackOverlayIcon({ playing }) {
  return (
    <Wrapper>
      <Icon name={playing ? 'pause' : 'play'} color={THEME_COLOR} iconSize="1.5rem" />
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
