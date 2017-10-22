import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 550px;
  height: 550px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${props => props.theme.zIndexes[5]};
  background: ${props => props.theme.colors.bg};
  transform: translate(-50%, -50%);
`;

function AddToPlaylistModal({ trackId }) {
  console.log(trackId);
  return (
    <Wrapper>
      <div>Hello {trackId}</div>
    </Wrapper>
  );
}

export default AddToPlaylistModal;
