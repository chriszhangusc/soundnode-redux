import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShadowOverlay from './ShadowOverlay';
import PlaybackOverlayIcon from './PlaybackOverlayIcon';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

function PlaybackOverlay({ playing, active, children, onClick }) {
  return (
    <Wrapper>
      <ShadowOverlay active={active} onClick={onClick}>
        <PlaybackOverlayIcon playing={playing} />
      </ShadowOverlay>
      {children}
    </Wrapper>
  );
}

export default PlaybackOverlay;
